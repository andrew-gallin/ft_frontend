import React, { Component } from 'react'
import './menu_button.css'

// example click handler for menu items
const itemClick = (e) => {
  console.log("clicked");
}

// config for menu -- Make this an input prop
const menuData = [
  {
    color: "#b3462f",
    icon: "fa-paper-plane",
    click: itemClick
  }, {
    color: "#e78b38",
    icon: "fa-pencil",
    click: itemClick
  }, {
    color: "#353535",
    icon: "fa-twitter",
    click: itemClick
  }, {
    color: "#303c54",
    icon: "fa-music",
    click: itemClick
  }, {
    color: "#3a384e",
    icon: "fa-search", 
    click: itemClick
  }, {
    color: "#78332c",
    icon: "fa-users",
    click: itemClick
  }
];

class RadialMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.makeMenu = this.makeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.animateButtons = this.animateButtons.bind(this);

    this.state = {
      menuOpen: false,
    };
  }

  componentWillMount() {
    this.makeMenu(menuData);
  }

  // calculate angles and distance between menu items
  // then set position on menu-item objects
  makeMenu(menuConfig) {
    const angle = 360 / menuConfig.length;
    let rotation = 0;
    let menuItems = [];

    menuConfig.forEach(({
      color,
      icon,
      click
    }) => {
      menuItems.push({
        color,
        icon,
        click,
        rotation,
        angle,
        show: false
      });
      rotation += angle;
    });

    this.setState({
      menuItems: menuItems
    });
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  // staggerd fade menu items in
  animateButtons() {
    const length = this.state.menuItems.length;

    const stagger = (i) => {
      if (i < length) {
        setTimeout(() => {
          let items = this.state.menuItems;
          let showing = this.state.menuItems[i].show;

          this.setState({
            menuItems: [
              ...items.slice(0, i),
              Object.assign({}, items[i], {
                show: !showing
              }),
              ...items.slice(i + 1)
            ]
          });

          stagger(i + 1);

        }, 60);
      }
    };

    stagger(0);
  }

  render() {
    return (
      <div className="wrapper">
        <MenuToggle
          toggle={this.toggleMenu}
          open={this.state.menuOpen}
          animateButtons={this.animateButtons}
        />
        <Menu
          size={18}
          items={this.state.menuItems}
          open={this.state.menuOpen}
        />
      </div>
    );
  }
};

const Menu = ({
  size,
  items,
  toggle,
  open
}) => (
    <div className={open
      ? "menu-wrapper-open"
      : "menu-wrapper-closed"}
    >
      <div className={"menu-background"}>
        <MenuItems
          size={size}
          items={items}
          open={open}
        />
      </div>
    </div>
  );

const MenuItems = ({
  size,
  items,
  open
}) => {
  const buttons = items.map((item) => {
    const styling = {
      transform:
        `rotate(${item.rotation}deg) 
           translate(${size / 2}em) 
           rotate(${-(item.rotation)}deg)`,
      backgroundColor: item.color
    };

    return (
      <a href="text-lesson">
        <div
          className={item.show
            ? "menu-item item-show"
            : "menu-item item-hide"}
          style={styling}
          onClick={item.click}
        >
          <i className={"fa " + item.icon}
            aria-hidden="true"
          ></i>
        </div>
      </a>
    );
  });

  return (
    <div
      className={open
        ? "button-bg animate-menu"
        : "button-bg"}
    > {buttons}
    </div>
  );
}

const MenuToggle = ({
  toggle,
  open,
  animateButtons
}) => (
    <button
      className={open
        ? "menu-toggle toggle-open"
        : "menu-toggle toggle-closed"}
      onClick={() => {
        toggle();
        setTimeout(
          animateButtons,
          120
        );
      }}
    > <i className={open
      ? "fa fa-times"
      : "fa fa-bars"}
      aria-hidden="true"
    ></i>
    </button>
  );

export default RadialMenu;