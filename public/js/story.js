const mainEl = document.querySelector('main');
const contentEl = document.querySelector('main div');
const reTitle = /^# ([^\r\n]+)/m;
const reIntro = /^# .*(?:\r?\n)([\s\S]*?)(?=\r?\n\s{0,3}(?:-{3,}|\*{3,}|_{3,})\s*$)/m;
const rePage = /^## [^\r\n]*(?:\r?\n[\s\S]*?)(?=\r?\n\s{0,3}(?:-{3,}|\*{3,}|_{3,})\s*$)/gm;

let title;
let pages = new Map();

const tokenizer = {
  link(src) {
    const match = src.match(/^\[(.+)\](?=\s|$)/);
    if (match) {
      const rawId = markedGfmHeadingId.unescape(match[1])
        .trim()
        .replace(/<[!\/a-z].*?>/gi, '');
      return {
        type: 'link',
        raw: match[0],
        href: `#${markedGfmHeadingId.slug(rawId)}`,
        text: match[1],
        title: null,
        tokens: [{
          type: 'text',
          raw: match[1],
          text: match[1]
        }],
      };
    }
    return false;
  }
};

marked.use(markedGfmHeadingId.gfmHeadingId());
marked.use(markedCustomHeadingId());
marked.use({ tokenizer });

function createContentFragment(md) {
  const template = document.createElement('template');
  template.innerHTML = marked.parse(md);
  return template.content;
}

function showContent(id) {
  id = id.replace(/^#/, '').trim();
  if (id && pages.has(id)) {
    contentEl.innerHTML = '';
    if (id == 'cover') {
      mainEl.classList.add('cover');
    } else {
      mainEl.classList.remove('cover');
    }
    contentEl.append(pages.get(id).cloneNode(true));
    contentEl.focus();
  }
}

async function showStory() {
  if (!showHeadings) {
    document.body.classList.add('noheadings');
  }

  let text;
  try {
    const response = await fetch(storyFile ?? './story.md');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    text = await response.text();
  } catch (err) {
    console.error(err);
    return;
  }

  const titleMatch = text.match(reTitle);
  const introMatch = text.match(reIntro);
  if (titleMatch && introMatch) {
    title = titleMatch[1];
    document.title = title;
    const h1 = document.createElement('h1');
    h1.textContent = title;
    mainEl.prepend(document.createElement('hr'));
    mainEl.prepend(h1);
    pages.set('cover', createContentFragment(introMatch[1]));

    const pageMatches = text.match(rePage) || [];
    for (var i = 0; i < pageMatches.length; i++) {
      const fragment = createContentFragment(pageMatches[i]);
      const h2 = fragment.querySelector('h2');
      if (h2 && h2.id) {
        pages.set(h2.id, fragment);
      } else {
        pages.set(i, fragment);
      }
    }
  } else {
    console.log('Story requires title and intro');
  }

  showContent(location.hash ? location.hash : 'cover');
}

window.addEventListener('hashchange', () => {
  showContent(location.hash ? location.hash : 'cover');
});

document.getElementById('up').addEventListener('click', (e) => {
  e.preventDefault();
  history.pushState('', document.title, location.pathname + location.search);
  showContent('cover');
});
document.getElementById('back').addEventListener('click', (e) => {
  e.preventDefault();
  history.back();
});
