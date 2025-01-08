(function () {
    class TextSelectionManager {
        constructor() {
            this.init();
            this.selectedRange = null;
            this.apiKey = null;
            this.settings = {
                language: 'en',
                speechSpeed: 1.4
            };
            this.initializeSettings();
            this.translations = window.translations;

            // 스크롤 가능한 부모 요소 배열
            this.scrollableParents = [];
        }

        async initializeSettings() {
            try {
                if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                    const result = await chrome.storage.sync.get(['OPENAI_API_KEY', 'LANGUAGE', 'SPEECH_SPEED']);
                    this.apiKey = result.OPENAI_API_KEY;
                    this.settings.language = result.LANGUAGE || 'ko';
                    this.settings.speechSpeed = result.SPEECH_SPEED || 1.4;
                } else {
                    this.showErrorDialog(this.t('chromeStorageError'));
                }
            } catch (error) {
                this.showErrorDialog(this.t('settingsLoadError') + error.message);
            }
        }

        // 번역 헬퍼 메소드
        t(key) {
            const lang = this.settings.language;
            return (this.translations[lang] && this.translations[lang][key]) || this.translations['en'][key];
        }

        init() {
            this.handleMouseUp = this.handleMouseUp.bind(this);
            this.handleKeyDown = this.handleKeyDown.bind(this);
            this.handleSelectionChange = this.handleSelectionChange.bind(this);
            this.handleScrollOrResize = this.handleScrollOrResize.bind(this);

            document.addEventListener('mouseup', this.handleMouseUp);
            document.addEventListener('keydown', this.handleKeyDown);
            document.addEventListener('selectionchange', this.handleSelectionChange);

            // 윈도우 스크롤 이벤트는 항상 등록
            window.addEventListener('scroll', this.handleScrollOrResize);
            // 윈도우 리사이즈 이벤트 등록
            window.addEventListener('resize', this.handleScrollOrResize);

            this.initializeStyles();
        }

        initializeStyles() {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = chrome.runtime.getURL('styles.css');
            document.head.appendChild(link);
        }

        showErrorDialog(message) {
            const dialog = document.createElement('div');
            dialog.className = 'notify-dialog';
            dialog.textContent = message;
            document.body.appendChild(dialog);

            setTimeout(() => {
                dialog.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => dialog.remove(), 300);
            }, 3000);
        }

        // 모든 스크롤 부모 요소를 찾아 배열로 반환
        findScrollableParents(element) {
            const scrollableParents = [];
            let parent = element.parentElement;
            while (parent) {
                const style = window.getComputedStyle(parent);
                const overflowY = style.getPropertyValue('overflow-y');
                const overflowX = style.getPropertyValue('overflow-x');
                const isYScrollable = (overflowY === 'scroll' || overflowY === 'auto') && parent.scrollHeight > parent.clientHeight;
                const isXScrollable = (overflowX === 'scroll' || overflowX === 'auto') && parent.scrollWidth > parent.clientWidth;

                if (isYScrollable || isXScrollable) {
                    scrollableParents.push(parent);
                }
                parent = parent.parentElement;
            }
            return scrollableParents;
        }

        handleMouseUp(e) {
            // 특정 영역을 클릭했을 때 기존 버튼 제거하는 로직
            if (e.target.closest('#selection-buttons') || e.target.closest('#settings-panel')) return;

            const container = document.getElementById('selection-buttons');
            if (
                container &&
                container.__createdAt &&
                Date.now() - container.__createdAt > 100 &&
                this.prevSelectionText === window.getSelection().toString()
            ) {
                container.remove();
                window.getSelection().removeAllRanges();
                return;
            }

            // 선택된 요소가 편집 가능한지 확인
            const selection = window.getSelection();
            const selectedNode = selection.anchorNode;

            // 선택된 노드가 없는 경우 처리
            if (!selectedNode) return;

            // 편집 가능한 요소 체크
            const editableElement = selectedNode.parentElement?.closest('[contenteditable="true"], input, textarea, [role="textbox"]');
            const currentlyFocusedElement = document.activeElement;
            if (
                currentlyFocusedElement && (
                    currentlyFocusedElement.hasAttribute('contenteditable') ||
                    currentlyFocusedElement.tagName === 'INPUT' ||
                    currentlyFocusedElement.tagName === 'TEXTAREA' ||
                    currentlyFocusedElement.getAttribute('role') === 'textbox' ||
                    currentlyFocusedElement.isContentEditable
                )
            ) return;
            if (editableElement) return;

            // contentEditable 속성 직접 체크
            if (selectedNode.parentElement?.getAttribute('contenteditable') === 'true') return;
            if (selectedNode.parentElement?.isContentEditable) return;

            // designMode 체크
            if (document.designMode === 'on') return;

            // 커스텀 에디터 프레임워크 체크 
            const possibleEditors = selectedNode.parentElement?.closest('.ql-editor, .ProseMirror, .CodeMirror, .ace_editor, .monaco-editor');
            if (possibleEditors) return;

            // iframe 내부 선택 체크
            const iframe = selectedNode.parentElement?.closest('iframe');
            if (iframe) {
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    if (iframeDoc.designMode === 'on') return;
                } catch (e) {
                    // 크로스 오리진 iframe은 무시
                }
            }

            // contentEditable이 상속된 경우 체크
            let parent = selectedNode.parentElement;
            while (parent) {
                if (window.getComputedStyle(parent).webkitUserModify?.includes('write')) return;
                parent = parent.parentElement;
            }

            // 이전 레이어 제거
            this.removeExistingLayer();

            const selectedText = selection.toString();
            if (!selectedText) return;

            // range 추출
            const range = selection.getRangeAt(0);

            // *** 주요 변경: 모든 스크롤 부모 찾아서 이벤트 등록
            this.scrollableParents = this.findScrollableParents(range.startContainer.parentElement);

            // triple click (전체 문장 선택) 관련 처리
            if (e.detail === 3) {
                try {
                    const newRange = document.createRange();
                    newRange.selectNodeContents(range.startContainer);
                    selection.removeAllRanges();
                    selection.addRange(newRange);
                } catch (error) {
                    console.error('Triple click range adjustment failed:', error);
                    return;
                }
            }
            // 여러 엘리먼트에 걸쳐있는 경우
            else {
                if (range.startContainer.parentElement !== range.endContainer.parentElement) {
                    try {
                        const walker = document.createTreeWalker(
                            range.commonAncestorContainer,
                            NodeFilter.SHOW_TEXT,
                            {
                                acceptNode: (node) => {
                                    if (range.intersectsNode(node)) {
                                        return NodeFilter.FILTER_ACCEPT;
                                    }
                                    return NodeFilter.FILTER_REJECT;
                                }
                            }
                        );

                        let node;
                        const validNodes = [];
                        while (node = walker.nextNode()) {
                            const nodeText = node.textContent.trim();
                            if (nodeText && !/^\s*$/.test(nodeText)) {
                                validNodes.push(node);
                            }
                        }

                        if (validNodes.length > 0) {
                            const newRange = document.createRange();
                            newRange.setStart(validNodes[0], 0);
                            newRange.setEnd(validNodes[validNodes.length - 1], validNodes[validNodes.length - 1].length);
                            selection.removeAllRanges();
                            selection.addRange(newRange);
                        }
                    } catch (error) {
                        console.error('Range adjustment failed:', error);
                        return;
                    }
                }
            }

            // 줄바꿈으로 끝나는 경우 처리
            const currentSelectedText = selection.toString();
            if (currentSelectedText.endsWith('\n')) {
                const currentRange = selection.getRangeAt(0);
                const endContainer = currentRange.endContainer;
                const endOffset = Math.min(currentRange.endOffset, endContainer.length);

                try {
                    currentRange.setEnd(endContainer, endOffset);
                    selection.removeAllRanges();
                    selection.addRange(currentRange);
                } catch (error) {
                    console.error('Range adjustment failed:', error);
                    return;
                }
            }

            // 최종 selectedRange와 rect 저장
            this.selectedRange = selection.getRangeAt(0);
            const rect = this.selectedRange.getBoundingClientRect();
            this.prevSelectionText = selection.toString();

            // *** 버튼 컨테이너를 body에 절대 위치로 추가
            this.createButtonContainer(rect);

            // *** 스크롤 가능한 부모 & window에 이벤트 등록
            this.scrollableParents.forEach(sp => sp.addEventListener('scroll', this.handleScrollOrResize, { passive: true }));
        }

        createButtonContainer(rect) {
            const container = document.createElement('div');
            container.id = 'selection-buttons';
            container.style.position = 'absolute';
            container.style.zIndex = '999999';
            container.__createdAt = Date.now();

            // body에 무조건 추가
            document.body.appendChild(container);

            // 절대 위치 계산
            container.style.left = `${window.scrollX + rect.left}px`;
            container.style.top = `${window.scrollY + rect.bottom + 10}px`;

            this.createButtons(container);
        }

        // 스크롤 or 리사이즈 시 위치 재계산
        handleScrollOrResize() {
            if (!this.selectedRange) return;

            // 현재 selection이 살아있는지 확인
            const selection = window.getSelection();
            if (!selection || !selection.rangeCount) {
                this.removeExistingLayer();
                return;
            }

            // 선택 범위 rect 갱신
            const rect = this.selectedRange.getBoundingClientRect();

            // 화면 밖으로 나가면 제거
            if (rect.bottom < 0 || rect.top > window.innerHeight) {
                this.removeExistingLayer();
                return;
            }

            const container = document.getElementById('selection-buttons');
            if (container) {
                container.style.left = `${window.scrollX + rect.left}px`;
                container.style.top = `${window.scrollY + rect.bottom + 10}px`;
            }
        }

        createButtons(container) {
            const buttons = [
                { text: this.t('summarize'), type: 'summarize' },
                { text: this.t('translate'), type: 'translate' },
                { text: this.t('speech'), type: 'speech' },
                { text: this.t('settings'), type: 'settings' }
            ];

            buttons.forEach(({ text, type }) => {
                const button = document.createElement('button');
                button.textContent = text;
                button.addEventListener('click', (event) => this.handleButtonClick(event, type));
                container.appendChild(button);
            });
        }

        async handleButtonClick(event, buttonType) {
            event.stopPropagation();

            if (buttonType === 'settings') {
                this.showSettingsPanel();
                return;
            }

            if (!this.apiKey) {
                alert(this.t('noApiKey'));
                return;
            }

            const currentSelectedText = window.getSelection().toString();
            if (!currentSelectedText) {
                alert(this.t('noSelection'));
                return;
            }

            const spinnerContainer = this.createSpinner();

            try {
                switch (buttonType) {
                    case 'summarize':
                        await this.handleSummarize(currentSelectedText, spinnerContainer);
                        break;
                    case 'translate':
                        await this.handleTranslate(currentSelectedText, spinnerContainer);
                        break;
                    case 'speech':
                        await this.handleSpeech(currentSelectedText, spinnerContainer);
                        break;
                }
            } catch (error) {
                this.showErrorDialog(`${this.t('processingError')} ${error.message}`);
                spinnerContainer.remove();
            }
        }

        showSettingsPanel() {
            const overlay = document.createElement('div');
            overlay.className = 'settings-overlay';
            document.body.appendChild(overlay);

            const panel = document.createElement('div');
            panel.id = 'settings-panel';

            panel.innerHTML = `
                <h2>${this.t('settingsTitle')}</h2>
                <div class="settings-group">
                    <label>${this.t('apiKeyLabel')}</label>
                    <input type="password" id="api-key" value="${this.apiKey || ''}" placeholder="${this.t('apiKeyPlaceholder')}">
                </div>
                <div class="settings-group">
                    <label>${this.t('languageLabel')}</label>
                    <select id="language">
                        <option value="ko">한국어</option>
                        <option value="en">English</option>
                        <option value="ja">日本語</option>
                        <option value="fr">Français</option>
                        <option value="vi">Tiếng Việt</option>
                        <option value="th">ภาษาไทย</option>
                        <option value="ru">Русский</option>
                        <option value="my">မြန်မာဘာသာ</option>
                        <option value="ms">Bahasa Melayu</option>
                        <option value="hi">हिन्दी</option>
                        <option value="it">Italiano</option>
                        <option value="de">Deutsch</option>
                        <option value="es">Español</option>
                        <option value="ar">العربية</option>
                        <option value="zh">中文</option>
                        <option value="hk">廣東話</option>
                        <option value="tw">臺灣話</option>
                        <option value="sw">Kiswahili</option>
                    </select>
                </div>
                <div class="settings-group">
                    <label>${this.t('speechSpeedLabel')}: <span id="speed-value">${this.settings.speechSpeed}x</span></label>
                    <input type="range" id="speech-speed" min="0.25" max="4.0" step="0.25" value="${this.settings.speechSpeed}">
                </div>
                <div class="settings-buttons">
                    <button class="cancel">${this.t('cancel')}</button>
                    <button class="save">${this.t('save')}</button>
                </div>
            `;

            document.body.appendChild(panel);

            const languageSelect = panel.querySelector('#language');
            languageSelect.value = this.settings.language;
            languageSelect.focus();

            const speedInput = panel.querySelector('#speech-speed');
            const speedValue = panel.querySelector('#speed-value');
            speedInput.addEventListener('input', (e) => {
                speedValue.textContent = `${e.target.value}x`;
            });

            panel.querySelector('.save').addEventListener('click', async () => {
                const newApiKey = panel.querySelector('#api-key').value;
                const newLanguage = panel.querySelector('#language').value;
                const newSpeed = parseFloat(panel.querySelector('#speech-speed').value);

                try {
                    await chrome.storage.sync.set({
                        'OPENAI_API_KEY': newApiKey,
                        'LANGUAGE': newLanguage,
                        'SPEECH_SPEED': newSpeed
                    });

                    this.apiKey = newApiKey;
                    this.settings.language = newLanguage;
                    this.settings.speechSpeed = newSpeed;

                    overlay.remove();
                    panel.remove();
                    this.showErrorDialog(this.t('settingsSaved'));
                } catch (error) {
                    this.showErrorDialog(this.t('settingsSaveError') + error.message);
                }
            });

            panel.querySelector('.cancel').addEventListener('click', () => {
                overlay.remove();
                panel.remove();
            });
        }

        createSpinner() {
            const spinnerContainer = document.createElement('div');
            spinnerContainer.id = 'loading-spinner-container';
            spinnerContainer.style.position = 'fixed';
            spinnerContainer.style.top = '0';
            spinnerContainer.style.left = '0';
            spinnerContainer.style.width = '100%';
            spinnerContainer.style.height = '100%';
            spinnerContainer.style.display = 'flex';
            spinnerContainer.style.justifyContent = 'center';
            spinnerContainer.style.alignItems = 'center';
            spinnerContainer.style.zIndex = '9999999';

            const spinner = document.createElement('div');
            spinner.style.animation = 'spin 1s linear infinite';

            spinnerContainer.appendChild(spinner);
            document.body.appendChild(spinnerContainer);
            return spinnerContainer;
        }

        async handleSummarize(text, spinnerContainer) {
            const response = await this.callOpenAI(text, '주어진 텍스트를 절반 정도의 길이로 핵심 내용만 요약해주세요.');
            this.updateSelectedText(response, spinnerContainer);
        }

        async handleTranslate(text, spinnerContainer) {
            const languageMap = {
                'ko': '한국어',
                'en': '영어',
                'ja': '일본어',
                'fr': '프랑스어',
                'vi': '베트남어',
                'th': '태국어',
                'ru': '러시아어',
                'my': '미얀마어',
                'ms': '말레이시아어',
                'hi': '힌디어',
                'it': '이탈리아어',
                'de': '독일어',
                'es': '스페인어',
                'ar': '아랍어',
                'zh': '중국어',
                'hk': '홍콩어',
                'tw': '대만어',
                'sw': '스와힐리어'
            };

            const targetLanguage = languageMap[this.settings.language] || '한국어';
            const response = await this.callOpenAI(
                text,
                `당신은 전문 번역가입니다. 주어진 텍스트를 ${targetLanguage}로 자연스럽게 번역해주세요.`
            );
            this.updateSelectedText(response, spinnerContainer);
        }

        async handleSpeech(text, spinnerContainer) {
            try {
                const response = await fetch('https://api.openai.com/v1/audio/speech', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'tts-1',
                        input: text,
                        voice: 'nova',
                        speed: this.settings.speechSpeed
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || 'API 요청 중 오류가 발생했습니다.');
                }

                const blob = await response.blob();
                const audio = new Audio(URL.createObjectURL(blob));
                audio.play();
            } finally {
                spinnerContainer.remove();
            }
        }

        async callOpenAI(text, systemPrompt) {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini', // 실제 사용시 본인 모델명으로 수정
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt
                        },
                        {
                            role: 'user',
                            content: text
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'API 요청 중 오류가 발생했습니다.');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        }

        updateSelectedText(newText, spinnerContainer) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);

            // 선택 영역 내용 교체
            range.deleteContents();
            range.insertNode(document.createTextNode(newText));
            spinnerContainer.remove();

            // 새로 삽입된 텍스트를 기준으로 다시 range를 세팅해둡니다
            this.selectedRange = window.getSelection().getRangeAt(0);

            // 위치 재조정
            const rect = this.selectedRange.getBoundingClientRect();
            const container = document.getElementById('selection-buttons');
            if (container) {
                container.style.left = `${window.scrollX + rect.left}px`;
                container.style.top = `${window.scrollY + rect.bottom + 10}px`;
            }
        }

        handleKeyDown(e) {
            if (e.key === 'Escape') {
                this.removeExistingLayer();
                const settingsPanel = document.getElementById('settings-panel');
                const overlay = document.querySelector('.settings-overlay');
                if (settingsPanel) settingsPanel.remove();
                if (overlay) overlay.remove();
            }
        }

        handleSelectionChange() {
            if (!window.getSelection().toString()) {
                this.removeExistingLayer();
                this.selectedRange = null;
            }
        }

        removeExistingLayer() {
            const existingLayer = document.getElementById('selection-buttons');
            if (existingLayer) {
                existingLayer.remove();
            }

            // 스크롤 이벤트 리스너 제거
            if (this.scrollableParents && this.scrollableParents.length) {
                this.scrollableParents.forEach(sp => {
                    sp.removeEventListener('scroll', this.handleScrollOrResize);
                });
            }
            // window 스크롤/리사이즈는 init 때 등록했으므로 계속 유지하거나, 
            // 필요에 따라 여기서 remove할 수도 있습니다.

            this.scrollableParents = [];
        }

        destroy() {
            document.removeEventListener('mouseup', this.handleMouseUp);
            document.removeEventListener('keydown', this.handleKeyDown);
            document.removeEventListener('selectionchange', this.handleSelectionChange);
            window.removeEventListener('scroll', this.handleScrollOrResize);
            window.removeEventListener('resize', this.handleScrollOrResize);

            // 스크롤 가능한 부모에 대해서도 제거
            if (this.scrollableParents && this.scrollableParents.length) {
                this.scrollableParents.forEach(sp => {
                    sp.removeEventListener('scroll', this.handleScrollOrResize);
                });
            }
            this.removeExistingLayer();
        }
    }

    const textSelectionManager = new TextSelectionManager();
})();
