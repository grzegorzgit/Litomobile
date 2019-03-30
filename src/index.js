require('./litomobile.scss');

function litomobile(config) {

    var litomobile = {

        container: null, // This is the mobile menu container div, set after method makeContainer().

        ul_menu: null, // This is menu object, set after method mobileUl().

        desktop_menu: (config.desktop_menu_to_hide) ? document.querySelector(config.desktop_menu_to_hide) : document.querySelector(config.ul_selector),

        is_opera_mini: (navigator.userAgent.indexOf('Opera Mini') > -1), // OperaMini doesn't support transforms, so the animation is done by transition width/height. 

        closeMenu(){
            this.container.className = this.container.className.replace("litomobile_open",'');
            this.container.className += " litomobile_closed";

            if (this.is_opera_mini) {
                this.icon.className += " litomobile_icon_closed_om";
                this.icon.className = this.icon.className.replace("litomobile_icon_open_om",''); 
            } else {
                this.icon.className += " litomobile_icon_closed";
                this.icon.className = this.icon.className.replace("litomobile_icon_open",'');  
            }

            // Opera Mini doesn't support transforms so the animation is done by width & height
            if (this.is_opera_mini) {
                if (config.position == 'left' || config.position == 'right') {
                    this.container.style.width = "0";
                } else {
                    this.container.style.height = "0";
                }
            } else {
                switch (config.position) {
                    case "left":
                        this.container.style.transform = "translateX(-" + this.menu_width + "px)";
                        this.container.style.msTransform = "translateX(-" + this.menu_width + "px)";
                        break;
                    case "right":
                        this.container.style.transform = "translateX(" + this.menu_width + "px)";
                        this.container.style.msTransform = "translateX(" + this.menu_width + "px)";
                        break;
                    case "top":
                        this.container.style.transform = "translateY(-" + this.menu_height + "px)";
                        this.container.style.msTransform = "translateY(-" + this.menu_height + "px)";
                        break;
                    case "bottom":
                        this.container.style.transform = "translateY(" + this.menu_height + "px)";
                        this.container.style.msTransform  = "translateY(" + this.menu_height + "px)";
                        break;
                }
            }
            var submenus = this.ul_menu.querySelectorAll('li > ul')
            var tmp_this = this;

            for(var i = 0; i < submenus.length ; i++){ 
                tmp_this.closeSubmenu(submenus[i])
            }
        },

        easing: config.animation_ease || "linear",
        animation_duration: config.animation_duration || "0.5s",

        openMenu(){ 
            this.container.style.transition = this.animation_duration + " " + this.easing;  
            this.container.className = this.container.className.replace("litomobile_closed",'');  
            this.container.className += " litomobile_open";

            if (this.is_opera_mini) {
                this.icon.className = this.icon.className.replace("litomobile_icon_closed_om",'');  
                this.icon.className += " litomobile_icon_open_om";
            } else {
                this.icon.className = this.icon.className.replace("litomobile_icon_closed",'');   
                this.icon.className += " litomobile_icon_open";
            }

            // Opera Mini doesn't support transforms so the animation is done by width & height 
            if (this.is_opera_mini) {
                if (config.position == 'left' || config.position == 'right') {
                    this.container.style.width = this.menu_width + "px";
                } else {
                    this.container.style.height = this.menu_height + "px";
                }
            } else {
                if (config.position == 'left' || config.position == 'right') {
                    this.container.style.transform = 'translateX(0)';
                    this.container.style['-ms-transform'] = 'translateX(0)';
                } else {
                    this.container.style.transform = 'translateY(0)';
                    this.container.style['-ms-transform'] = 'translateY(0)';
                }
            }
        },

        menu_width: null, // Set after setPosition().

        menu_height: null, // Set after set_poisition().

        setPosition(){
            // If there is margin added to ul in stylesheet than it must be added to container width.
            var style = this.ul_menu.currentStyle || window.getComputedStyle(this.ul_menu);

            // To get the menu width it's needed to show it for a moment to calculate, then hide it again.
            this.container.style.vsibility = "hidden";
            this.container.style.width = "auto";
            this.menu_width = this.container.querySelector('.litomobile_menu').offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
            this.menu_height = this.ul_menu.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);

            if (this.is_opera_mini) {
                this.container.style.width = null; // OperaMini makes animation by changing the width/height
            } else {
                switch (config.position) {
                    case "left":
                        this.container.style.width = this.menu_width + "px";
                        this.container.style.transform = "translateX(-" + this.menu_width + "px)";
                        this.container.style['-ms-transform'] = "translateX(-" + this.menu_width + "px)";
                        break;
                    case "right":
                        this.container.style.width = this.menu_width + "px";
                        this.container.style.transform = "translateX(" + this.menu_width + "px)";
                        this.container.style['-ms-transform'] = "translateX(" + this.menu_width + "px)";
                        break;
                    case "top":
                        this.container.style.height = this.menu_height + "px";
                        this.container.style.width = "100%";
                        this.container.style.transform = "translateY(-" + this.menu_height + "px)";
                        this.container.style['-ms-transform'] = "translateY(-" + this.menu_height + "px)";
                        break;
                    case "bottom":
                        this.container.style.height = this.menu_height + "px";
                        this.container.style.width = "100%";
                        this.container.style.transform = "translateY(" + this.menu_height + "px)";
                        this.container.style['-ms-transform'] = "translateY(" + this.menu_height + "px)";
                        break;
                }
            }

            this.container.style.vsibility = "visible";
        },

        icon: null, // Icon object, set after makeIcon().

        makeIcon(){
            var icon = document.createElement("div");
            icon.className = "litomobile_icon";
            var middle_bar = document.createElement("div");

            // If the icon width is provided then use it, otherwise take it from stylesheet (30px).
            (config.icon_width) ? icon.style.width = config.icon_width : "";

            var icon_height = 20;
            if (config.icon_height) {
                // set the icon height only if it's set in config, otherwise use stylesheet (20px)
                icon.style.height = config.icon_height;
                icon_height = parseFloat(config.icon_height);
            }

            // Calculate position of the middle bar in the icon, from total height take out the top bar height and put middle bar in the left space
            var middle_bar_marginTop = (icon_height * 0.2) / 2 * -1;
            middle_bar.style.marginTop = middle_bar_marginTop + "px";
            icon.appendChild(middle_bar);
            icon.appendChild(middle_bar.cloneNode());

            var tmp_this = this;

            // Open or close menu on icon click.
            icon.addEventListener('click', function () {
                if (tmp_this.container.className.indexOf('litomobile_open') > -1) {
                    tmp_this.closeMenu();
                } else {
                    tmp_this.openMenu();
                }
            });

            // Close menu on click outside the menu.
            document.addEventListener("click", function (evt) {
                if (tmp_this.container.className.indexOf('litomobile_open') > -1 &&
                    evt.target.className.indexOf('litomobile_icon') ==-1
                ) {
                    var targetElement = evt.target;
                    var icon_middle_bar = icon.querySelector('div');
                    var icon_middle_bar2 = icon.querySelector('div:nth-child(2)');
                    do {
                        if (targetElement == tmp_this.container || targetElement == icon_middle_bar || targetElement == icon_middle_bar2) {
                            // This is a click inside. Do nothing, just return.
                            return;
                        }
                        // Go up the DOM.
                        targetElement = targetElement.parentNode;
                    } while (targetElement);
                    // Detected click outside the menu, close it.
                    tmp_this.closeMenu();
                }
            });

            var target_place;
            if (config.icon_container) {
                target_place = document.querySelector(config.icon_container);
            } else {
                // If container is not provided than put the icon in document, with calculated positions:
                target_place = document.body;
                icon.style.zIndex = 1000;
                icon.style.position = "fixed";
                switch (config.position) {
                    case "right":
                        icon.style.top = "30px";
                        icon.style.left = "30px";
                        break;
                    case "left":
                        icon.style.top = "30px";
                        icon.style.right = "30px";
                        break;
                    case "top":
                        icon.style.top = "20px";
                        icon.style.left = "50%";
                        icon.style.marginLeft = "-" + parseFloat(config.icon_width) / 2 + "px"
                        break;
                    case "bottom":
                        icon.style.bottom = "30px";
                        icon.style.left = "50%";
                        icon.style.marginLeft = "-" + parseFloat(config.icon_width) / 2 + "px"
                        break;
                }
            }

            target_place.appendChild(icon);
            this.icon = icon;
        },

        openSubmenu(element) {
            
            // Set the height based on its calculated height, put in data-height attr.
            // IE 10 supports only slow getAttribute()
            element.style.height = (element.dataset) ? element.dataset.height : element.getAttribute('data-height');
             
        },

        closeSubmenu(element) {
            element.style.height = "0";

            // Remove class if the closeSubmenu() is invoked not from processSubmenu() but from whole menu closing. 
            element.parentElement.className = element.parentElement.className.replace("submenu_opened", '');
        },

        processSubmenu(element) {
            if (element.className.indexOf("submenu_opened") > -1) {
                this.closeSubmenu(element.querySelector("ul"));
                element.className = element.className.replace("submenu_opened", '');
            } else {
                element.className += " submenu_opened";
                this.openSubmenu(element.querySelector("ul"));
            }
        },

        addClickListener(){
            var tmp_this = this;
            var lis = this.container.querySelectorAll(".litomobile_menu > li");

            for(var i = 0; i < lis.length; i++){
                
                var element = lis[i]; 
                // If menu item contains submenu, then calculate this submenu height and put it in data-height attr.
                if (element.querySelector("ul")) {
                    var submenu = element.querySelector("ul");
                    submenu.setAttribute("data-height", tmp_this.getHeightWithMargins(submenu) + "px");
                }

                // Add click listener, if clicked item contains submenu then opens it, if not then closes the menu.
                element.addEventListener('click', function (e) {
                    if (e.target.querySelector("ul")) {
                        tmp_this.processSubmenu(e.target);
                    } else {
                        tmp_this.closeMenu();
                    }
                })
            }
        },

        mobileUl(){
            var lis = document.querySelectorAll(config.ul_selector + " > li");
            var litomobile_menu = document.createElement("ul");
            litomobile_menu.className = "litomobile_menu";

            // Add id to mobile menu, if it was set in config.
            (config.set_id) ? litomobile_menu.id = config.set_id : "";

            // Pupulate new menu with li copied from original
            for (let i = 0; i < lis.length; i++) {
                var li_element = lis[i].cloneNode(true);
                litomobile_menu.appendChild(li_element);
            }

            this.ul_menu = litomobile_menu;
            return litomobile_menu;
        },

        makeContainer(){
            // Create container div for the menu.
            var container = document.createElement("div");
            container.appendChild(this.mobileUl());

            // Add classes.
            var classes = " litomobile_container";
            if (config.theme) {
                classes += " litomobile_" + config.theme;
            }
            switch (config.position) {
                case 'right':
                    classes += " litomobile_right";
                    break;
                case 'left':
                    classes += " litomobile_left";
                    break;
                case 'top':
                    classes += " litomobile_top";
                    break;
                case 'bottom':
                    classes += " litomobile_bottom";
                    break;
            }
            container.className = classes;

            document.body.appendChild(container);
            this.container = container;
            this.setPosition();
            this.addClickListener();
            this.emitEvent();
        },

        init(){ 
            this.makeContainer();
            this.makeIcon();
            this.desktop_menu.style.display = "none"; 
        },

        show(){
            this.container.style.display = "block";
            this.icon.style.display = "block";
            this.desktop_menu.style.display = "none";
        },

        hide(){
            this.container.style.display = "none";
            this.icon.style.display = "none";
            this.desktop_menu.style.display = null;
        },

        getWindowWidth(){
            var width;
            if (window.innerHeight !== undefined) width = window.innerWidth; // most browsers
            else { // IE varieties
                var D = (document.body.clientWidth) ? document.body : document.documentElement;
                width = D.clientWidth;
            }
            return width;
        },

        getHeightWithMargins(element) {
            var style = element.currentStyle || window.getComputedStyle(element);
            var height = null;

            // To get element's height it must have height: auto, for the mesuring.
            element.style.vsibility = "hidden";
            element.style.height = "auto";
            height = element.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
            element.style.height = "0px";
            element.style.vsibility = "visible";
            return height;
        },

        // Emits event when mobile menu is created.
        emitEvent(){
            
            var event;
            if (typeof(Event) === 'function') {
                event = new Event("litomobileCreated");
            } else {
                event = document.createEvent('Event');
                event.initEvent("litomobileCreated", true, true);
            }
            window.dispatchEvent(event);
        }
    };
    
    // Show / hide when window is resized to breakpoint.
    window.addEventListener("resize", function () {
        if (litomobile.getWindowWidth() <= parseFloat(config.window_size)) {
            if (litomobile.ul_menu) {
                litomobile.show();
            } else {
                litomobile.init();
            }
        } else if (litomobile.ul_menu) {
            litomobile.hide();
            litomobile.closeMenu();
        }
    }) 

    // Check if window size to initialise mobile menu.
    if (litomobile.getWindowWidth() <= parseFloat(config.window_size)) {
        litomobile.init();
    }

    
}
window.litomobile = litomobile;