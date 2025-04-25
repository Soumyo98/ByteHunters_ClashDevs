
const translations = {
    en: {
        title: "User Preferences",
        themeTitle: "Theme",
        themeButton: "Toggle Theme",
        currentTheme: "Current theme: ",
        fontTitle: "Font Size",
        languageTitle: "Language",
        languageButton: "Toggle Language (English/Spanish)",
        profileTitle: "Profile Management",
        profilePlaceholder: "Profile name",
        saveProfile: "Save Profile",
        loadProfile: "Load Profile",
        exportProfile: "Export Profile",
        light: "Light",
        dark: "Dark",
        exportConfirmation: "Do you want to export the current profile?",
        profileSaved: "Profile saved successfully!",
        profileLoaded: "Profile loaded successfully!"
    },
    es: {
        title: "Preferencias de Usuario",
        themeTitle: "Tema",
        themeButton: "Cambiar Tema",
        currentTheme: "Tema actual: ",
        fontTitle: "Tamaño de Fuente",
        languageTitle: "Idioma",
        languageButton: "Cambiar Idioma (Inglés/Español)",
        profileTitle: "Gestión de Perfiles",
        profilePlaceholder: "Nombre del perfil",
        saveProfile: "Guardar Perfil",
        loadProfile: "Cargar Perfil",
        exportProfile: "Exportar Perfil",
        light: "Claro",
        dark: "Oscuro",
        exportConfirmation: "¿Desea exportar el perfil actual?",
        profileSaved: "¡Perfil guardado correctamente!",
        profileLoaded: "¡Perfil cargado correctamente!"
    }
};


const elements = {
    body: document.body,
    title: document.getElementById('title'),
    themeTitle: document.getElementById('theme-title'),
    toggleThemeBtn: document.getElementById('toggle-theme'),
    currentTheme: document.getElementById('current-theme'),
    fontTitle: document.getElementById('font-title'),
    fontSlider: document.getElementById('font-slider'),
    fontValue: document.getElementById('font-value'),
    fontUnit: document.getElementById('font-unit'),
    languageTitle: document.getElementById('language-title'),
    toggleLanguageBtn: document.getElementById('toggle-language'),
    profileTitle: document.getElementById('profile-title'),
    profileName: document.getElementById('profile-name'),
    saveProfileBtn: document.getElementById('save-profile'),
    profileSelector: document.getElementById('profile-selector'),
    loadProfileBtn: document.getElementById('load-profile'),
    exportProfileBtn: document.getElementById('export-profile')
};


let currentState = {
    theme: 'light',
    fontSize: 16,
    fontUnit: 'px',
    language: 'en',
    profiles: {}
};


function init() {
    loadPreferences();
    setupEventListeners();
    updateUI();
}


function loadPreferences() {
    const savedTheme = localStorage.getItem('theme');
    const savedFontSize = localStorage.getItem('fontSize');
    const savedFontUnit = localStorage.getItem('fontUnit');
    const savedLanguage = localStorage.getItem('language');
    const savedProfiles = localStorage.getItem('profiles');

    if (savedTheme) currentState.theme = savedTheme;
    if (savedFontSize) currentState.fontSize = parseInt(savedFontSize);
    if (savedFontUnit) currentState.fontUnit = savedFontUnit;
    if (savedLanguage) currentState.language = savedLanguage;
    if (savedProfiles) currentState.profiles = JSON.parse(savedProfiles);

    elements.fontSlider.value = currentState.fontSize;
    elements.fontUnit.value = currentState.fontUnit;
    
    updateProfileSelector();
}


function savePreferences() {
    localStorage.setItem('theme', currentState.theme);
    localStorage.setItem('fontSize', currentState.fontSize.toString());
    localStorage.setItem('fontUnit', currentState.fontUnit);
    localStorage.setItem('language', currentState.language);
    localStorage.setItem('profiles', JSON.stringify(currentState.profiles));
}


function setupEventListeners() {
   
    elements.toggleThemeBtn.addEventListener('click', toggleTheme);
    
   
    elements.fontSlider.addEventListener('input', updateFontSize);
    elements.fontUnit.addEventListener('change', updateFontUnit);
    
    
    elements.toggleLanguageBtn.addEventListener('click', toggleLanguage);
    
   
    elements.saveProfileBtn.addEventListener('click', saveProfile);
    elements.loadProfileBtn.addEventListener('click', loadProfile);
    elements.exportProfileBtn.addEventListener('click', exportProfile);
}


function updateUI() {
    
    elements.body.className = currentState.theme === 'dark' ? 'dark-mode' : '';
    elements.currentTheme.textContent = translations[currentState.language].currentTheme + 
                                      translations[currentState.language][currentState.theme];
    
   
    elements.fontValue.textContent = `${currentState.fontSize}${currentState.fontUnit}`;
    document.body.style.fontSize = `${currentState.fontSize}${currentState.fontUnit}`;
    
 
    applyTranslations();
}


function applyTranslations() {
    const lang = translations[currentState.language];
    elements.title.textContent = lang.title;
    elements.themeTitle.textContent = lang.themeTitle;
    elements.toggleThemeBtn.textContent = lang.themeButton;
    elements.fontTitle.textContent = lang.fontTitle;
    elements.languageTitle.textContent = lang.languageTitle;
    elements.toggleLanguageBtn.textContent = lang.languageButton;
    elements.profileTitle.textContent = lang.profileTitle;
    elements.profileName.placeholder = lang.profilePlaceholder;
    elements.saveProfileBtn.textContent = lang.saveProfile;
    elements.loadProfileBtn.textContent = lang.loadProfile;
    elements.exportProfileBtn.textContent = lang.exportProfile;
    
    elements.currentTheme.textContent = lang.currentTheme + lang[currentState.theme];
}


function toggleTheme() {
    currentState.theme = currentState.theme === 'light' ? 'dark' : 'light';
    savePreferences();
    updateUI();
}


function updateFontSize() {
    currentState.fontSize = parseInt(elements.fontSlider.value);
    savePreferences();
    updateUI();
}


function updateFontUnit() {
    currentState.fontUnit = elements.fontUnit.value;
    savePreferences();
    updateUI();
}


function toggleLanguage() {
    currentState.language = currentState.language === 'en' ? 'es' : 'en';
    savePreferences();
    updateUI();
}


function updateProfileSelector() {
    elements.profileSelector.innerHTML = '';
    
    for (const profileName in currentState.profiles) {
        const option = document.createElement('option');
        option.value = profileName;
        option.textContent = profileName;
        elements.profileSelector.appendChild(option);
    }
}


function saveProfile() {
    const profileName = elements.profileName.value.trim();
    if (!profileName) return;
    
    currentState.profiles[profileName] = {
        theme: currentState.theme,
        fontSize: currentState.fontSize,
        fontUnit: currentState.fontUnit,
        language: currentState.language
    };
    
    savePreferences();
    updateProfileSelector();
    elements.profileName.value = '';
    
    alert(translations[currentState.language].profileSaved);
}


function loadProfile() {
    const profileName = elements.profileSelector.value;
    if (!profileName || !currentState.profiles[profileName]) return;
    
    const profile = currentState.profiles[profileName];
    currentState.theme = profile.theme;
    currentState.fontSize = profile.fontSize;
    currentState.fontUnit = profile.fontUnit;
    currentState.language = profile.language;
    
    
    elements.fontSlider.value = currentState.fontSize;
    elements.fontUnit.value = currentState.fontUnit;
    
    savePreferences();
    updateUI();
    
    alert(translations[currentState.language].profileLoaded);
}


function exportProfile() {
    const confirmation = confirm(translations[currentState.language].exportConfirmation);
    if (!confirmation) return;
    
    const profileData = {
        theme: currentState.theme,
        fontSize: currentState.fontSize,
        fontUnit: currentState.fontUnit,
        language: currentState.language
    };
    
    const dataStr = JSON.stringify(profileData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportName = 'user_preferences.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
}


init();
