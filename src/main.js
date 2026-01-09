const FEED_URL_PART = "/feed";
const PROFILE_LINK_SELECTOR = '.profile-card-member-details a[href*="/in/"]';
const GLOBAL_NAV_ITEM_SELECTOR = '.global-nav__primary-item';
const HOME_BUTTON_TEXT = "Home";
const OBSERVER_CONFIG = { 
    childList: true, 
    subtree: true 
};

function getProfileUrl() {
    const profileCardLink = document.querySelector(PROFILE_LINK_SELECTOR);
    if (profileCardLink && profileCardLink.href) {
        return profileCardLink.href;
    }

    console.log('Profile URL not found');
    return null;
}

function removeHomeButton() {
    const navItems = document.querySelectorAll(GLOBAL_NAV_ITEM_SELECTOR);
    navItems.forEach(item => {
        if (item.innerText && item.innerText.includes(HOME_BUTTON_TEXT)) {
            item.style.display = 'none';
        }
    });
}

function redirectFromFeed() {
    if (!window.location.pathname.startsWith(FEED_URL_PART)) 
        return;

    const profileUrl = getProfileUrl();
    if (profileUrl) {
        window.location.replace(profileUrl);
    }
}

function main() {
    removeHomeButton();
    redirectFromFeed();    
}

main();

const observer = new MutationObserver(main);
observer.observe(document.body, OBSERVER_CONFIG);