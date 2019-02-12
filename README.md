# Litomobile
Small script that takes desktop menu based on UL and creates mobile version of this menu.

# How to use
Include litomobile.min.css and litomobile.min.js (from minified directory) in your website.

Then initialise it:
  ```
<script>

    var litomobile_config = {
      ul_selector: '.desktop_menu_ul_selector',  // Selector for the desktop menu.
      position: 'left',                          // Mobile menu position on screen. Values: left, right, top, bottom.
      window_size: "780px",                      // Breakpoint after which activate the mobile menu.
      theme: "blue",                             // Optional. Adds additional styles to the mobile menu. Values: blue, red, dark, light.
    }

    litomobile(litomobile_config);

</script>
```   

# Options:

     ul_selector - Selector for the desktop menu.
      set_id - Optional. Sets the mobile menu id attribute.
      desktop_menu_to_hide - Optional. Selector for menu to hide after reaching the mobile breakpoint,  deafaulty it's the same as ul_selector.
      position - Mobile menu position on screen. Values: left, right, top, bottom.
      animation_ease - Optional. Menu opening and closing css animation easing. Default: linear.
      icon_container - Optional. Selector for where to put hamburger icon.
      animation_duration - Optional. How long the opening and closing animation should take. Default: "0.5s"
      theme - Optional. Adds additional styles to the mobile menu. Values: blue, red, dark, light.
      icon_width - Mobile menu hamburger icon width.
      icon_height - Mobile menu hamburger icon height.
      window_size - Breakpoint after which activate the mobile menu (only in px).
