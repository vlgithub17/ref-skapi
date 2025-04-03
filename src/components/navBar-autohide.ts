import { ref, watch, type Ref } from "vue";

let navCss: CSSStyleDeclaration;
let parentEl: HTMLElement | Window | any;
let scrollOffset = 0;
let topOffset = 0;
let offsetProp = 'pageYOffset';
let autoHide: any;
let host: HTMLElement;
const body = document.body;
export let routeName: Ref<string> = ref('');
let navTop = 0;

watch(routeName, (nv) => {
	if(nv === 'home') {
		navTop = 20;
		body.style.setProperty('--nav-position', 'fixed');
		body.style.setProperty('--nav-top', navTop + 'px');
	} else {
		navTop = 10;
		body.style.setProperty('--nav-position', 'sticky'); // apply css variable
		body.style.setProperty('--nav-top', navTop + 'px');
	}
})

let prep = () => {
    if (autoHide === undefined) {
        // no given attribute
        return;
    }

    if (!autoHide) {
        // attribute exists but empty value. set to default.
        autoHide = 3;
    }

    if (autoHide) {
        if (typeof autoHide === 'string') {
            // html attributes are string
            try {
                autoHide = JSON.parse(autoHide);
            } catch (err) {
                autoHide = 0;
            }
        }

        if (typeof autoHide === 'boolean') {
            // if 'true' | 'false' is given.
            autoHide = autoHide ? 3 : 0;
        }

        else if (typeof autoHide === 'number') {
            if (autoHide < 0) {
                // if value is less than 0
                autoHide = 0;
            }
        }

        else {
            // other types are not allowed
            autoHide = 0;
        }
        if(autoHide) {
            load();
        }
    }
}

let calcNavbarPosition = () => {
    window.requestAnimationFrame(() => {
        const navHeight = parseInt(navCss.height);
        const scrollOffsetCond = parentEl[offsetProp] < 0 ? 0 : parentEl[offsetProp]; // on mobile, offsetProp can be negative
        const offsetDifference = (scrollOffset - scrollOffsetCond) / autoHide;

        const topOffsetRes = (() => {
            let topOffsetCalc = topOffset + offsetDifference;
            if (topOffsetCalc < -navHeight) {
                // if offset is beyond navHeight
                return -navHeight;
            }
            if (topOffsetCalc > navTop) {
                // offset is positive
                return navTop;
            }

            return topOffsetCalc; // return int range
        })();

        scrollOffset = scrollOffsetCond; // update scroll offset
        topOffset = topOffsetRes;
        body.style.setProperty('--nav-top', `${topOffsetRes}px`); // apply css variable
    });
};


export let removeListener = () => {
    // remove windows event
    if (offsetProp === 'pageYOffset') {
        document.removeEventListener('scroll', calcNavbarPosition);
    }
    else {
        parentEl.removeEventListener('scroll', calcNavbarPosition);
    }
}

let load = () => {
    navCss = window.getComputedStyle(host);
    // get body element

	// body.style.setProperty('--nav-position', 'sticky'); // apply css variable

    if (autoHide) {
        let seekScrollableParent = (el:HTMLElement) => {
            if (el) {
                if (el.scrollHeight > el.clientHeight && 'hidden' !== window.getComputedStyle(el).overflowY) {
                    return el;
                }
                else {
                    return seekScrollableParent(el.parentElement);
                }
            }
            else {
                return el;
            }
        };

        let scrollableParent = seekScrollableParent(host.parentElement);
        if (scrollableParent && scrollableParent.tagName.toLowerCase() !== 'html') {
            offsetProp = 'scrollTop';
            parentEl = scrollableParent;
            parentEl.addEventListener(
                'scroll',
                calcNavbarPosition,
                { passive: true }
            );
        } else {
            parentEl = window;
            document.addEventListener(
                'scroll',
                calcNavbarPosition,
                { passive: true }
            );
        }

    }
}

export let setAutoHide = (el:HTMLElement, value: any) => {
    /*
      Note:
        - additional attribute "auto-hide" hides nav element when parent is scrolled.
        "auto-hide" attribute can also have number value(greater than 0) for hiding movement curves.
        ex) auto-hide="8" gives slower hiding, auto-hide='2' gives faster hiding.
            when value is not gives default value is '3'
    */
    host = el;
    autoHide = value;
    prep();
}
