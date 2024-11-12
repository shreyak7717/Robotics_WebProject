// home.js

// Create header and add logo with text and navigation
const header = document.createElement('header');

// Logo section
const logoDiv = document.createElement('div');
logoDiv.classList.add('logo');

const logoLink = document.createElement('a');
logoLink.href = '/';
const logoImg = document.createElement('img');
logoImg.src = 'images/logo.png';
logoImg.alt = 'Robotics Club Logo';

logoLink.appendChild(logoImg);
logoDiv.appendChild(logoLink);

const logoText = document.createElement('h1');
logoText.textContent = 'Robotics Club';
logoDiv.appendChild(logoText);

// Add logo to header
header.appendChild(logoDiv);

// Navigation section
const nav = document.createElement('nav');
const navItems = [
  { href: '/', text: 'HOME' },
  { href: '/events', text: 'EVENTS' },
  { href: '/resources', text: 'RESOURCES' },
  { href: '/ContactUs', text: 'CONTACT' },
];

navItems.forEach(item => {
  const navLink = document.createElement('a');
  navLink.href = item.href;
  navLink.id = 'nav-item';
  navLink.textContent = item.text;
  nav.appendChild(navLink);
});

header.appendChild(nav);
document.body.appendChild(header);

// Sidebar
const sidebar = document.createElement('div');
sidebar.classList.add('side_bar');

// Social media icons
const iconList = document.createElement('ul');
iconList.classList.add('icons');

const socialLinks = [
  { href: '#home', src: './images/mdi_instagram.png', alt: 'Instagram' },
  { href: '#about', src: './images/hugeicons_twitter.png', alt: 'Twitter' },
  { href: '#services', src: './images/linkedin.png', alt: 'LinkedIn' },
  { href: '#contact', src: './images/mdi_youtube.png', alt: 'YouTube' },
];

socialLinks.forEach(link => {
  const listItem = document.createElement('li');
  const socialLink = document.createElement('a');
  socialLink.href = link.href;

  const iconImg = document.createElement('img');
  iconImg.src = link.src;
  iconImg.alt = link.alt;

  socialLink.appendChild(iconImg);
  listItem.appendChild(socialLink);
  iconList.appendChild(listItem);
});

sidebar.appendChild(iconList);

// Lower sidebar links
const lowerList = document.createElement('ul');
lowerList.classList.add('lower');

const lowerLinks = [
  { href: '/gallery', text: 'Gallery' },
  { href: '/team', text: 'Our Team' },
  { href: '/timeline', text: 'Timeline' },
];

lowerLinks.forEach(link => {
  const listItem = document.createElement('li');
  const lowerLink = document.createElement('a');
  lowerLink.href = link.href;
  lowerLink.textContent = link.text;

  listItem.appendChild(lowerLink);
  lowerList.appendChild(listItem);
});

sidebar.appendChild(lowerList);
document.body.appendChild(sidebar);

// Text section
const textDiv = document.createElement('div');
textDiv.classList.add('text');

const textContent = [
  { class: 'highlight', text: 'ROBOTICS', color: '' },
  { class: 'highlight', text: 'CLUB', color: '#ffffff' },
  { class: 'subtext', text: 'The official ROBOTICS club of BMU', color: '#29cde3' },
];

textContent.forEach(content => {
  const p = document.createElement('p');
  p.classList.add(content.class);
  p.textContent = content.text;
  if (content.color) {
    p.style.color = content.color;
  }
  textDiv.appendChild(p);
});

document.body.appendChild(textDiv);
