/**
 * CSInterface.js - CEP Interface Library
 * This is a simplified version. In production, you should use the official Adobe CEP SDK
 * or download it from Adobe's developer resources.
 */

(function() {
    'use strict';
    
    var CSInterface = function() {
        this.hostVersion = null;
        this.hostCapabilities = null;
        this.hostEnvironment = null;
        this.extensionPath = null;
        this.systemPath = null;
        this.extensionId = null;
    };
    
    CSInterface.prototype.getExtensionId = function() {
        return window.__adobe_cep__.getExtensionId();
    };
    
    CSInterface.prototype.getHostVersion = function() {
        return window.__adobe_cep__.getHostVersion();
    };
    
    CSInterface.prototype.getHostCapabilities = function() {
        return JSON.parse(window.__adobe_cep__.getHostCapabilities());
    };
    
    CSInterface.prototype.getHostEnvironment = function() {
        return JSON.parse(window.__adobe_cep__.getHostEnvironment());
    };
    
    CSInterface.prototype.evalScript = function(script, callback) {
        if (window.__adobe_cep__ && window.__adobe_cep__.evalScript) {
            window.__adobe_cep__.evalScript(script, callback);
        } else {
            console.error('CSInterface: evalScript not available');
            if (callback) callback('');
        }
    };
    
    CSInterface.prototype.getExtensionPath = function() {
        try {
            if (window.__adobe_cep__ && typeof window.__adobe_cep__.getExtensionPath === 'function') {
                return window.__adobe_cep__.getExtensionPath();
            }
            if (window.__adobe_cep__ && typeof window.__adobe_cep__.getSystemPath === 'function') {
                var extPath = window.__adobe_cep__.getSystemPath(SystemPath.EXTENSION);
                if (extPath) return decodeURIComponent(extPath);
            }
        } catch (e) {}

        try {
            var href = window.location && window.location.href ? window.location.href : '';
            if (href.indexOf('file://') === 0) href = href.substring(7);
            if (href) {
                href = decodeURIComponent(href);
                var q = href.indexOf('?');
                if (q !== -1) href = href.substring(0, q);
                var h = href.indexOf('#');
                if (h !== -1) href = href.substring(0, h);
                var lastSlash = href.lastIndexOf('/');
                if (lastSlash !== -1) href = href.substring(0, lastSlash);
                if (href.length > 2 && href.charAt(0) === '/' && href.charAt(2) === ':') {
                    href = href.substring(1);
                }
                return href;
            }
        } catch (e2) {}

        return '';
    };
    
    CSInterface.prototype.getSystemPath = function(pathType) {
        var systemPath = window.__adobe_cep__.getSystemPath(pathType || SystemPath.USER_DATA);
        return decodeURIComponent(systemPath);
    };
    
    CSInterface.prototype.getNetworkPreferences = function() {
        var result = window.__adobe_cep__.getNetworkPreferences();
        return JSON.parse(result);
    };
    
    CSInterface.prototype.getScaleFactor = function() {
        return window.__adobe_cep__.getScaleFactor();
    };
    
    CSInterface.prototype.setScaleFactorChangedHandler = function(handler) {
        window.__adobe_cep__.setScaleFactorChangedHandler(handler);
    };
    
    CSInterface.prototype.resizeContent = function(width, height) {
        window.__adobe_cep__.resizeContent(width, height);
    };
    
    CSInterface.prototype.requestExtension = function(extensionId, params) {
        var paramsString = JSON.stringify(params);
        window.__adobe_cep__.requestExtension(extensionId, paramsString);
    };
    
    // System Path constants
    var SystemPath = {
        USER_DATA: 'userData',
        COMMON_FILES: 'commonFiles',
        MY_DOCUMENTS: 'myDocuments',
        APPLICATION: 'application',
        EXTENSION: 'extension',
        HOST_APPLICATION: 'hostApplication'
    };
    
    // Export - always set on window for CEP panel usage
    // (Never use module.exports here: --enable-nodejs makes `module` defined,
    //  which would prevent window.CSInterface from being set)
    window.CSInterface = CSInterface;
    window.SystemPath = SystemPath;
    
})();

