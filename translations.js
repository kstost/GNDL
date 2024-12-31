const translations = {
    ko: {
        summarize: '요약',
        translate: '번역',
        speech: '스피치',
        settings: '⚙️',
        settingsTitle: '설정',
        apiKeyLabel: 'API Key',
        apiKeyPlaceholder: 'OpenAI API Key를 입력하세요',
        languageLabel: '언어 설정',
        speechSpeedLabel: '음성 재생 속도',
        cancel: '취소',
        save: '저장',
        settingsSaved: '설정이 저장되었습니다.',
        settingsSaveError: '설정 저장 실패:',
        noApiKey: 'API Key를 먼저 설정해주세요.',
        noSelection: '선택된 텍스트가 없습니다.',
        processingError: '처리 중 오류:',
        chromeStorageError: 'Chrome storage API를 사용할 수 없습니다.',
        settingsLoadError: '설정 로드 실패:'
    },
    en: {
        summarize: 'Summary',
        translate: 'Translate',
        speech: 'Speech',
        settings: '⚙️',
        settingsTitle: 'Settings',
        apiKeyLabel: 'API Key',
        apiKeyPlaceholder: 'Enter your OpenAI API Key',
        languageLabel: 'Language Settings',
        speechSpeedLabel: 'Speech Speed',
        cancel: 'Cancel',
        save: 'Save',
        settingsSaved: 'Settings saved successfully.',
        settingsSaveError: 'Failed to save settings:',
        noApiKey: 'Please set your API Key first.',
        noSelection: 'No text selected.',
        processingError: 'Error during processing:',
        chromeStorageError: 'Chrome storage API is not available.',
        settingsLoadError: 'Failed to load settings:'
    },
    ja: {
        summarize: '要約',
        translate: '翻訳',
        speech: '音声',
        settings: '⚙️',
        settingsTitle: '設定',
        apiKeyLabel: 'APIキー',
        apiKeyPlaceholder: 'OpenAI APIキーを入力してください',
        languageLabel: '言語設定',
        speechSpeedLabel: '音声再生速度',
        cancel: 'キャンセル',
        save: '保存',
        settingsSaved: '設定が保存されました。',
        settingsSaveError: '設定の保存に失敗:',
        noApiKey: 'APIキーを設定してください。',
        noSelection: 'テキストが選択されていません。',
        processingError: '処理中のエラー:',
        chromeStorageError: 'Chrome storage APIが利用できません。',
        settingsLoadError: '設定の読み込みに失敗:'
    },
    fr: {
        summarize: 'Résumé',
        translate: 'Traduire',
        speech: 'Parler',
        settings: '⚙️',
        settingsTitle: 'Paramètres',
        apiKeyLabel: 'Clé API',
        apiKeyPlaceholder: 'Entrez votre clé API OpenAI',
        languageLabel: 'Paramètres de langue',
        speechSpeedLabel: 'Vitesse de lecture',
        cancel: 'Annuler',
        save: 'Enregistrer',
        settingsSaved: 'Paramètres enregistrés avec succès.',
        settingsSaveError: 'Échec de l\'enregistrement des paramètres:',
        noApiKey: 'Veuillez d\'abord définir votre clé API.',
        noSelection: 'Aucun texte sélectionné.',
        processingError: 'Erreur lors du traitement:',
        chromeStorageError: 'L\'API de stockage Chrome n\'est pas disponible.',
        settingsLoadError: 'Échec du chargement des paramètres:'
    },
    vi: {
        summarize: 'Tóm tắt',
        translate: 'Dịch',
        speech: 'Giọng nói',
        settings: '⚙️',
        settingsTitle: 'Cài đặt',
        apiKeyLabel: 'Khóa API',
        apiKeyPlaceholder: 'Nhập khóa API OpenAI của bạn',
        languageLabel: 'Cài đặt ngôn ngữ',
        speechSpeedLabel: 'Tốc độ phát âm',
        cancel: 'Hủy',
        save: 'Lưu',
        settingsSaved: 'Đã lưu cài đặt thành công.',
        settingsSaveError: 'Lỗi khi lưu cài đặt:',
        noApiKey: 'Vui lòng thiết lập khóa API trước.',
        noSelection: 'Chưa chọn văn bản.',
        processingError: 'Lỗi trong quá trình xử lý:',
        chromeStorageError: 'API lưu trữ của Chrome không khả dụng.',
        settingsLoadError: 'Không thể tải cài đặt:'
    },
    th: {
        summarize: 'สรุป',
        translate: 'แปล',
        speech: 'เสียงพูด',
        settings: '⚙️',
        settingsTitle: 'การตั้งค่า',
        apiKeyLabel: 'คีย์ API',
        apiKeyPlaceholder: 'กรุณาใส่คีย์ OpenAI API',
        languageLabel: 'การตั้งค่าภาษา',
        speechSpeedLabel: 'ความเร็วเสียง',
        cancel: 'ยกเลิก',
        save: 'บันทึก',
        settingsSaved: 'บันทึกการตั้งค่าเรียบร้อยแล้ว',
        settingsSaveError: 'เกิดข้อผิดพลาดในการบันทึกการตั้งค่า:',
        noApiKey: 'กรุณาตั้งค่าคีย์ API ก่อน',
        noSelection: 'ไม่ได้เลือกข้อความ',
        processingError: 'เกิดข้อผิดพลาดระหว่างการประมวลผล:',
        chromeStorageError: 'ไม่สามารถใช้งาน Chrome Storage API ได้',
        settingsLoadError: 'ไม่สามารถโหลดการตั้งค่าได้:'
    },
    ru: {
        summarize: 'Резюме',
        translate: 'Перевести',
        speech: 'Озвучить',
        settings: '⚙️',
        settingsTitle: 'Настройки',
        apiKeyLabel: 'API ключ',
        apiKeyPlaceholder: 'Введите ваш API ключ OpenAI',
        languageLabel: 'Настройки языка',
        speechSpeedLabel: 'Скорость речи',
        cancel: 'Отмена',
        save: 'Сохранить',
        settingsSaved: 'Настройки успешно сохранены.',
        settingsSaveError: 'Ошибка сохранения настроек:',
        noApiKey: 'Пожалуйста, сначала установите API ключ.',
        noSelection: 'Текст не выбран.',
        processingError: 'Ошибка обработки:',
        chromeStorageError: 'API хранилища Chrome недоступно.',
        settingsLoadError: 'Не удалось загрузить настройки:'
    },
    my: {
        summarize: 'အကျဉ်းချုပ်',
        translate: 'ဘာသာပြန်',
        speech: 'အသံ',
        settings: '⚙️',
        settingsTitle: 'ဆက်တင်များ',
        apiKeyLabel: 'API သော့',
        apiKeyPlaceholder: 'OpenAI API သော့ကို ထည့်သွင်းပါ',
        languageLabel: 'ဘာသာစကား ဆက်တင်များ',
        speechSpeedLabel: 'အသံအမြန်နှုန်း',
        cancel: 'ပယ်ဖျက်',
        save: 'သိမ်းဆည်း',
        settingsSaved: 'ဆက်တင်များကို သိမ်းဆည်းပြီးပါပြီ။',
        settingsSaveError: 'ဆက်တင်များ သိမ်းဆည်းရန် မအောင်မြင်ပါ:',
        noApiKey: 'ကျေးဇူးပြု၍ API သော့ကို ဦးစွာ သတ်မှတ်ပါ။',
        noSelection: 'စာသား ရွေးချယ်ထားခြင်း မရှိပါ။',
        processingError: 'လုပ်ဆောင်နေစဉ် အမှား:',
        chromeStorageError: 'Chrome သိမ်းဆည်းမှု API မရရှိနိုင်ပါ။',
        settingsLoadError: 'ဆက်တင်များ ဖွင့်၍မရပါ:'
    },
    ms: {
        summarize: 'Ringkasan',
        translate: 'Terjemah',
        speech: 'Ucapan',
        settings: '⚙️',
        settingsTitle: 'Tetapan',
        apiKeyLabel: 'Kunci API',
        apiKeyPlaceholder: 'Masukkan Kunci API OpenAI anda',
        languageLabel: 'Tetapan Bahasa',
        speechSpeedLabel: 'Kelajuan Ucapan',
        cancel: 'Batal',
        save: 'Simpan',
        settingsSaved: 'Tetapan berjaya disimpan.',
        settingsSaveError: 'Gagal menyimpan tetapan:',
        noApiKey: 'Sila tetapkan Kunci API terlebih dahulu.',
        noSelection: 'Tiada teks dipilih.',
        processingError: 'Ralat semasa pemprosesan:',
        chromeStorageError: 'API storan Chrome tidak tersedia.',
        settingsLoadError: 'Gagal memuatkan tetapan:'
    },
    hi: {
        summarize: 'सारांश',
        translate: 'अनुवाद',
        speech: 'बोली',
        settings: '⚙️',
        settingsTitle: 'सेटिंग्स',
        apiKeyLabel: 'API कुंजी',
        apiKeyPlaceholder: 'अपनी OpenAI API कुंजी दर्ज करें',
        languageLabel: 'भाषा सेटिंग्स',
        speechSpeedLabel: 'बोली की गति',
        cancel: 'रद्द करें',
        save: 'सहेजें',
        settingsSaved: 'सेटिंग्स सफलतापूर्वक सहेजी गईं।',
        settingsSaveError: 'सेटिंग्स सहेजने में विफल:',
        noApiKey: 'कृपया पहले API कुंजी सेट करें।',
        noSelection: 'कोई टेक्स्ट चयनित नहीं है।',
        processingError: 'प्रोसेसिंग में त्रुटि:',
        chromeStorageError: 'Chrome स्टोरेज API उपलब्ध नहीं है।',
        settingsLoadError: 'सेटिंग्स लोड करने में विफल:'
    },
    it: {
        summarize: 'Riassumi',
        translate: 'Traduci',
        speech: 'Parla',
        settings: '⚙️',
        settingsTitle: 'Impostazioni',
        apiKeyLabel: 'Chiave API',
        apiKeyPlaceholder: 'Inserisci la tua chiave API OpenAI',
        languageLabel: 'Impostazioni lingua',
        speechSpeedLabel: 'Velocità voce',
        cancel: 'Annulla',
        save: 'Salva',
        settingsSaved: 'Impostazioni salvate con successo.',
        settingsSaveError: 'Errore nel salvataggio delle impostazioni:',
        noApiKey: 'Per favore imposta prima la chiave API.',
        noSelection: 'Nessun testo selezionato.',
        processingError: 'Errore durante l\'elaborazione:',
        chromeStorageError: 'API di archiviazione Chrome non disponibile.',
        settingsLoadError: 'Impossibile caricare le impostazioni:'
    },
    de: {
        summarize: 'Zusammenfassen',
        translate: 'Übersetzen',
        speech: 'Sprechen',
        settings: '⚙️',
        settingsTitle: 'Einstellungen',
        apiKeyLabel: 'API-Schlüssel',
        apiKeyPlaceholder: 'Geben Sie Ihren OpenAI API-Schlüssel ein',
        languageLabel: 'Spracheinstellungen',
        speechSpeedLabel: 'Sprechgeschwindigkeit',
        cancel: 'Abbrechen',
        save: 'Speichern',
        settingsSaved: 'Einstellungen erfolgreich gespeichert.',
        settingsSaveError: 'Fehler beim Speichern der Einstellungen:',
        noApiKey: 'Bitte zuerst API-Schlüssel festlegen.',
        noSelection: 'Kein Text ausgewählt.',
        processingError: 'Fehler bei der Verarbeitung:',
        chromeStorageError: 'Chrome Storage API nicht verfügbar.',
        settingsLoadError: 'Einstellungen konnten nicht geladen werden:'
    },
    es: {
        summarize: 'Resumir',
        translate: 'Traducir',
        speech: 'Hablar',
        settings: '⚙️',
        settingsTitle: 'Configuración',
        apiKeyLabel: 'Clave API',
        apiKeyPlaceholder: 'Ingrese su clave API de OpenAI',
        languageLabel: 'Configuración de idioma',
        speechSpeedLabel: 'Velocidad de voz',
        cancel: 'Cancelar',
        save: 'Guardar',
        settingsSaved: 'Configuración guardada exitosamente.',
        settingsSaveError: 'Error al guardar la configuración:',
        noApiKey: 'Por favor, configure primero la clave API.',
        noSelection: 'No hay texto seleccionado.',
        processingError: 'Error durante el procesamiento:',
        chromeStorageError: 'API de almacenamiento de Chrome no disponible.',
        settingsLoadError: 'No se pudo cargar la configuración:'
    },
    ar: {
        summarize: 'تلخيص',
        translate: 'ترجمة',
        speech: 'نطق',
        settings: '⚙️',
        settingsTitle: 'الإعدادات',
        apiKeyLabel: 'مفتاح API',
        apiKeyPlaceholder: 'أدخل مفتاح OpenAI API الخاص بك',
        languageLabel: 'إعدادات اللغة',
        speechSpeedLabel: 'سرعة النطق',
        cancel: 'إلغاء',
        save: 'حفظ',
        settingsSaved: 'تم حفظ الإعدادات بنجاح.',
        settingsSaveError: 'فشل في حفظ الإعدادات:',
        noApiKey: 'الرجاء تعيين مفتاح API أولاً.',
        noSelection: 'لم يتم تحديد نص.',
        processingError: 'خطأ أثناء المعالجة:',
        chromeStorageError: 'واجهة برمجة تطبيقات تخزين Chrome غير متوفرة.',
        settingsLoadError: 'فشل في تحميل الإعدادات:'
    },
    zh: {
        summarize: '总结',
        translate: '翻译',
        speech: '语音',
        settings: '⚙️',
        settingsTitle: '设置',
        apiKeyLabel: 'API密钥',
        apiKeyPlaceholder: '请输入OpenAI API密钥',
        languageLabel: '语言设置',
        speechSpeedLabel: '语音速度',
        cancel: '取消',
        save: '保存',
        settingsSaved: '设置保存成功。',
        settingsSaveError: '保存设置时出错：',
        noApiKey: '请先设置API密钥。',
        noSelection: '未选择文本。',
        processingError: '处理过程中出错：',
        chromeStorageError: 'Chrome存储API不可用。',
        settingsLoadError: '无法加载设置：'
    },
    hk: {
        summarize: '總結',
        translate: '翻譯',
        speech: '語音',
        settings: '⚙️',
        settingsTitle: '設定',
        apiKeyLabel: 'API密鑰',
        apiKeyPlaceholder: '請輸入OpenAI API密鑰',
        languageLabel: '語言設定',
        speechSpeedLabel: '語音速度',
        cancel: '取消',
        save: '保存',
        settingsSaved: '設定保存成功。',
        settingsSaveError: '保存設定時出錯：',
        noApiKey: '請先設置API密鑰。',
        noSelection: '未選擇文本。',
        processingError: '處理過程中出錯：',
        chromeStorageError: 'Chrome存儲API不可用。',
        settingsLoadError: '無法加載設定：'
    },
    tw: {
        summarize: '摘要',
        translate: '翻譯',
        speech: '語音',
        settings: '⚙️',
        settingsTitle: '設定',
        apiKeyLabel: 'API金鑰',
        apiKeyPlaceholder: '請輸入OpenAI API金鑰',
        languageLabel: '語言設定',
        speechSpeedLabel: '語音速度',
        cancel: '取消',
        save: '儲存',
        settingsSaved: '設定儲存成功。',
        settingsSaveError: '儲存設定時出錯：',
        noApiKey: '請先設定API金鑰。',
        noSelection: '未選擇文字。',
        processingError: '處理過程中出錯：',
        chromeStorageError: 'Chrome儲存API不可用。',
        settingsLoadError: '無法載入設定：'
    },
    sw: {
        summarize: 'Muhtasari',
        translate: 'Tafsiri',
        speech: 'Usemi',
        settings: '⚙️',
        settingsTitle: 'Mipangilio',
        apiKeyLabel: 'Ufunguo wa API',
        apiKeyPlaceholder: 'Ingiza Ufunguo wako wa OpenAI API',
        languageLabel: 'Mipangilio ya Lugha',
        speechSpeedLabel: 'Kasi ya Usemi',
        cancel: 'Ghairi',
        save: 'Hifadhi',
        settingsSaved: 'Mipangilio imehifadhiwa kwa mafanikio.',
        settingsSaveError: 'Imeshindwa kuhifadhi mipangilio:',
        noApiKey: 'Tafadhali weka Ufunguo wa API kwanza.',
        noSelection: 'Hakuna maandishi yaliyochaguliwa.',
        processingError: 'Hitilafu wakati wa uchakataji:',
        chromeStorageError: 'API ya hifadhi ya Chrome haipatikani.',
        settingsLoadError: 'Imeshindwa kupakia mipangilio:'
    }
};

window.translations = translations; 