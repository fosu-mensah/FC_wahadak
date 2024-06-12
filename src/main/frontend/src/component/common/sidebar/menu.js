import React from "react";
export const MENUITEMS = [
  {
    title: "Player Search",
    icon: <i className="pe-7s-id"></i>,
    type: "sub",
    path: ``,
    active: true,
    children: [
      { title: "Player Search", type: "sub" },
      {
        title: "example1",
        type: "link",
        path: ``,
      },
      {
        title: "example2",
        type: "link",
        path: ``,
      },
      {
        title: "example3",
        type: "link",
        path: ``,
      },
    ],
  },
  {
    title: "Squad Maker",
    icon: <i className="icofont icofont-soccer"></i>,
    type: "sub",
    path: ``,
    active: false,
    children: [
      { title: "Squad Maker", type: "sub" },
      {
        title: "example1",
        type: "link",
        path: ``,
      },
      {
        title: "example2",
        type: "link",
        path: ``,
      },
      {
        title: "example3",
        type: "link",
        path: ``,
      },
    ],
  },
  {
    title: "Notice Board",
    icon: <i className="icofont icofont-paper"></i>,
    type: "sub",
    path: ``,
    active: false,
    children: [
      { title: "Notice Board", type: "sub" },
      {
        title: "자유 게시판",
        type: "link",
        path: ``,
      },
      {
        title: "자랑 게시판",
        type: "link",
        path: ``,
      },
    ],
  },
  {
    title: "NEWS",
    icon: <i className="icofont icofont-world"></i>,
    type: "sub",
    path: ``,
    active: false,
    children: [
      { title: "NEWS", type: "sub" },
      {
        title: "FourFourTwo 독점 뉴스",
        type: "link",
        path: `${process.env.PUBLIC_URL}/news/442exclusive`,
      },
      {
        title: "해외 축구 뉴스",
        type: "link",
        path: `${process.env.PUBLIC_URL}/news/international`,
      },
      {
        title: "국내 축구 뉴스",
        type: "link",
        path: `${process.env.PUBLIC_URL}/news/domestic`,
      },
    ],
  },
  {
    title: "Event",
    icon: <i className="icofont icofont-award"></i>,
    type: "sub",
    path: ``,
    active: false,
    children: [
      { title: "Event", type: "sub" },
      {
        title: "FC wahadak Event",
        type: "link",
        path: ``,
      },
      {
        title: "FC Online Event",
        type: "link",
        path: ``,
      },
    ],
  },
  {
    title: "WEB SHOP",
    icon: <i className="icofont icofont-shopping-cart"></i>,
    type: "sub",
    path: `${process.env.PUBLIC_URL}/ecommerce-app/product`,
    active: false,
    children: [
      { title: "WEB SHOP", type: "sub" },
      {
        title: "Product",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ecommerce-app/product`,
      },
      {
        title: "Product page",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ecommerce-app/product-page`,
      },
      {
        title: "Product list ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ecommerce-app/product-list`,
      },
      {
        title: "Payment Details",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ecommerce-app/product-details`,
      },
      {
        title: "Order History",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ecommerce-app/orederhistory`,
      },
      {
        title: "Invoice",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ecommerce-app/invoice`,
      },
      {
        title: "Pricing",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ecommerce-app/pricing`,
      },
    ],
  },
  {
    title: "Pages",
    icon: <i className="pe-7s-copy-file"></i>,
    type: "sub",
    path: `${process.env.PUBLIC_URL}/pages/sample-page`,
    active: false,
    children: [
      { title: "All Pages", type: "sub" },
      {
        title: "Sample page",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/sample-page`,
      },
      {
        title: "Support Ticket",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/support-ticket`,
      },
      {
        title: "Search Website ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/search`,
      },
      {
        title: "Error 400",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/error-400`,
      },
      {
        title: "Error 404",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/error-404`,
      },
      {
        title: "Error 500",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/error-500`,
      },
      {
        title: "Maintenance",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/maintenance`,
      },
      {
        title: "Login Simple",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/login`,
      },
      {
        title: "Register Simple",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/register`,
      },
      {
        title: "Forget Password",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/forget-password`,
      },
      {
        title: "Coming Simple",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/comingsoon`,
      },
      {
        title: "Coming with Bg video",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/comingsoon-bg-video`,
      },
      {
        title: "Coming with Bg Image",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/comingsoon-bg-image`,
      },
    ],
  },
  {
    title: "UI Kits",
    icon: <i className="pe-7s-portfolio pe-lg"></i>,
    type: "sub",
    path: `${process.env.PUBLIC_URL}/ui-element/typography`,
    active: false,
    bookmark: true,
    children: [
      { title: "Ui Elements", type: "sub" },
      {
        title: "Typography",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/typography`,
      },
      {
        title: "Buttons ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/button`,
      },
      {
        title: "Avatars",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/avatar`,
      },
      {
        title: "helper classes",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/helperclass`,
      },
      {
        title: "Grid ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/grid`,
      },
      {
        title: "Tag & pills",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/tagsandpills`,
      },
      {
        title: "Modal",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/modalComponent`,
      },
      {
        title: "Progress",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/progress-bars`,
      },
      {
        title: "Alert ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/alertComponent`,
      },
      {
        title: "Popover",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/popoverComponent`,
      },
      {
        title: "Tooltip",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/tooltipsComponent`,
      },
      {
        title: "Spinners ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/spinner`,
      },
      {
        title: "Dropdown",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/dropdownComponent`,
      },
      {
        title: "Bootstrap Tabs",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/tab-bootstrap`,
      },
      {
        title: "Line Tabs ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/tab-line`,
      },
      {
        title: "Accordion",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/accordionComponent`,
      },
      {
        title: "Navs",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/navsComponent`,
      },
      {
        title: "Lists ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/list`,
      },
      {
        title: "Scrollable",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/scrollable`,
      },
      {
        title: "Bootstrap Notify ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/bootstrap-notify`,
      },
      {
        title: "Rating",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/rating`,
      },
      {
        title: "Drag And Drop",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/draganddrop`,
      },
      {
        title: "Dropzone",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/dropzone`,
      },
      {
        title: "Tour ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/tourComponent`,
      },
      {
        title: "SweetAlert2",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/sweetAlert`,
      },
      {
        title: "Owl Carousel",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/carousel`,
      },
      {
        title: "Ribbons ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/ribbon`,
      },
      {
        title: "Pagination",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/pagination`,
      },
      {
        title: "Steps",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/steps`,
      },
      {
        title: "Breadcrumb ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/breadcrumb`,
      },
      {
        title: "Range Slider",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/rangeSlider`,
      },
      {
        title: "Image cropper",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/imageCropper`,
      },
      {
        title: "Sticky ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/stickyNotes`,
      },
      {
        title: "Upload ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/image-upload`,
      },
      { title: "Icons", type: "sub-header" },
      {
        title: "Fontawesome Icon ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/fontAwsomeIcon`,
      },
      {
        title: "Ico Icon ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/icoIcons`,
      },
      {
        title: "Feather icon ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/featherIcons`,
      },
      {
        title: "Thimify Icon ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/themifyIcons`,
      },
      {
        title: "Whether Icon ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/weatherIcons`,
      },
      {
        title: "pe7 icon",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/pe7Icon`,
      },
      {
        title: "Ionic Icon ",
        type: "link",
        path: `${process.env.PUBLIC_URL}/ui-element/ionic-icon`,
      },
    ],
  },
];
