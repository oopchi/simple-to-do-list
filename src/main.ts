import { Theme } from './theme';

new Theme();

const toggleBtn = document.createElement('button');

toggleBtn.addEventListener('click', () => {
    Theme.toggleTheme();
});

toggleBtn.innerHTML = 'click me';

document.body.appendChild(toggleBtn);

const removeBtn = document.createElement('button');

removeBtn.addEventListener('click', () => {
    Theme.useSystemTheme();
});

removeBtn.innerHTML = 'rem me';

document.body.appendChild(removeBtn);
