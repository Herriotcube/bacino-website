(function () {
  "use strict";

  var REPO_OWNER = "Herriotcube";
  var REPO_NAME = "bacino-website";
  var FILE_PATH = "data.js";
  var BASE_BRANCH = "master";
  var TOKEN_KEY = "bacino_admin_token";

  var SECTIONS = [
    { key: "food", label: "Food" },
    { key: "setlunch", label: "Set Lunch" },
    { key: "specials", label: "Chef's Specials" },
    { key: "drinks", label: "Drinks" }
  ];

  var els = {
    setupPanel: document.getElementById("setupPanel"),
    editorPanel: document.getElementById("editorPanel"),
    tokenInput: document.getElementById("tokenInput"),
    connectBtn: document.getElementById("connectBtn"),
    setupError: document.getElementById("setupError"),
    disconnectBtn: document.getElementById("disconnectBtn"),
    statusDot: document.getElementById("statusDot"),
    statusText: document.getElementById("statusText"),
    sectionTabs: document.getElementById("sectionTabs"),
    sectionContent: document.getElementById("sectionContent"),
    addCategoryBtn: document.getElementById("addCategoryBtn"),
    saveBar: document.getElementById("saveBar"),
    saveStatus: document.getElementById("saveStatus"),
    saveBtn: document.getElementById("saveBtn")
  };

  var state = {
    token: null,
    fileSha: null,
    originalText: "",
    data: null,
    currentTab: "food",
    dirty: false
  };

  /* ===== base64 <-> utf8 helpers ===== */
  function b64DecodeUnicode(b64) {
    var binary = atob(b64.replace(/\n/g, ""));
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder("utf-8").decode(bytes);
  }
  function b64EncodeUnicode(str) {
    var bytes = new TextEncoder().encode(str);
    var binary = "";
    for (var i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  /* ===== GitHub API ===== */
  function ghFetch(path, opts) {
    opts = opts || {};
    var headers = Object.assign(
      { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
      opts.headers || {}
    );
    if (state.token) headers.Authorization = "Bearer " + state.token;
    return fetch("https://api.github.com" + path, {
      method: opts.method || "GET",
      headers: headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined
    }).then(function (res) {
      if (!res.ok) {
        return res.json().catch(function () { return {}; }).then(function (err) {
          var msg = (err && err.message) || (res.status + " " + res.statusText);
          throw new Error(msg);
        });
      }
      return res.json();
    });
  }

  /* ===== parse / serialize data.js ===== */
  function parseMenuData(text) {
    var expr = text
      .replace(/\r\n/g, "\n")
      .replace(/^\/\/.*\n/, "")
      .replace(/^const MENU_DATA = /, "")
      .replace(/;\s*$/, "");
    // eslint-disable-next-line no-new-func
    return new Function("return " + expr)();
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n");
  }
  function str(s) { return '"' + esc(s) + '"'; }

  function serializeItem(item) {
    var parts = ["name: " + str(item.name), "price: " + str(item.price), "desc: " + str(item.desc)];
    if (item.heading) parts.push("heading: " + str(item.heading));
    if (item.orAlt) parts.push("orAlt: true");
    if (item.special) parts.push("special: true");
    return "{ " + parts.join(", ") + " }";
  }
  function serializeCategory(cat) {
    var s = '    { key: ' + str(cat.key) + ", label: " + str(cat.label);
    if (cat.note) s += ", note: " + str(cat.note);
    s += ", items: [\n";
    s += cat.items.map(function (it) { return "      " + serializeItem(it); }).join(",\n");
    s += "\n    ]}";
    return s;
  }
  function serializeSection(categories) {
    return categories.map(serializeCategory).join(",\n");
  }
  function serializeFaq(f) {
    var parts = ["q: " + str(f.q), "a: " + str(f.a)];
    if (f.reserveCta) parts.push("reserveCta: true");
    return "    { " + parts.join(", ") + " }";
  }
  function serializeMenuData(data) {
    var out = "// Menu data extracted from the Bacino design handoff.\n";
    out += "const MENU_DATA = {\n";
    SECTIONS.forEach(function (s) {
      out += "  " + s.key + ": [\n" + serializeSection(data[s.key] || []) + "\n  ],\n\n";
    });
    out += "  faqs: [\n" + (data.faqs || []).map(serializeFaq).join(",\n") + "\n  ]\n";
    out += "};\n";
    return out;
  }

  /* ===== connection ===== */
  function setStatus(connected, label) {
    els.statusDot.classList.toggle("on", connected);
    els.statusText.textContent = label;
    els.disconnectBtn.hidden = !connected;
  }

  function connect(token) {
    els.setupError.hidden = true;
    els.connectBtn.disabled = true;
    els.connectBtn.textContent = "Connecting…";
    state.token = token;

    ghFetch("/repos/" + REPO_OWNER + "/" + REPO_NAME + "/contents/" + FILE_PATH)
      .then(function (res) {
        localStorage.setItem(TOKEN_KEY, token);
        state.fileSha = res.sha;
        state.originalText = b64DecodeUnicode(res.content);
        state.data = parseMenuData(state.originalText);
        setStatus(true, "Connected");
        els.setupPanel.hidden = true;
        els.editorPanel.hidden = false;
        els.saveBar.hidden = false;
        renderTabs();
        renderSection(state.currentTab);
      })
      .catch(function (e) {
        state.token = null;
        localStorage.removeItem(TOKEN_KEY);
        setStatus(false, "Not connected");
        els.setupError.hidden = false;
        els.setupError.textContent = "Couldn't connect: " + e.message + ". Check your token has Contents + Pull requests permissions on this repo, and that you're a collaborator.";
      })
      .finally(function () {
        els.connectBtn.disabled = false;
        els.connectBtn.textContent = "Connect";
      });
  }

  function disconnect() {
    localStorage.removeItem(TOKEN_KEY);
    state.token = null;
    state.data = null;
    state.dirty = false;
    setStatus(false, "Not connected");
    els.editorPanel.hidden = true;
    els.saveBar.hidden = true;
    els.setupPanel.hidden = false;
    els.tokenInput.value = "";
  }

  /* ===== rendering ===== */
  function markDirty() {
    state.dirty = true;
    els.saveStatus.classList.remove("error");
    els.saveStatus.textContent = "Editing — changes aren't saved until you submit them.";
  }

  function renderTabs() {
    els.sectionTabs.innerHTML = "";
    SECTIONS.forEach(function (s) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tab-btn" + (s.key === state.currentTab ? " active" : "");
      btn.textContent = s.label;
      btn.addEventListener("click", function () {
        state.currentTab = s.key;
        renderTabs();
        renderSection(s.key);
      });
      els.sectionTabs.appendChild(btn);
    });
  }

  function field(labelText, inputEl) {
    var wrap = document.createElement("div");
    var label = document.createElement("span");
    label.className = "field-mini-label";
    label.textContent = labelText;
    wrap.appendChild(label);
    wrap.appendChild(inputEl);
    return wrap;
  }

  function textInput(value, onChange) {
    var el = document.createElement("input");
    el.type = "text";
    el.value = value || "";
    el.addEventListener("input", function () { onChange(el.value); markDirty(); });
    return el;
  }
  function textArea(value, onChange, rows) {
    var el = document.createElement("textarea");
    el.rows = rows || 2;
    el.value = value || "";
    el.addEventListener("input", function () { onChange(el.value); markDirty(); });
    return el;
  }
  function checkbox(checked, labelText, onChange) {
    var label = document.createElement("label");
    var el = document.createElement("input");
    el.type = "checkbox";
    el.checked = !!checked;
    el.addEventListener("change", function () { onChange(el.checked); markDirty(); });
    label.appendChild(el);
    label.appendChild(document.createTextNode(labelText));
    return label;
  }
  function iconBtn(icon, title, onClick, danger) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-icon btn-sm " + (danger ? "btn-danger" : "btn-ghost");
    btn.title = title;
    btn.innerHTML = '<i class="fa-solid ' + icon + '"></i>';
    btn.addEventListener("click", onClick);
    return btn;
  }

  function renderSection(sectionKey) {
    els.sectionContent.innerHTML = "";
    var categories = state.data[sectionKey] || [];
    var isSetlunch = sectionKey === "setlunch";

    categories.forEach(function (cat, catIdx) {
      var card = document.createElement("div");
      card.className = "category-card";

      var head = document.createElement("div");
      head.className = "category-head";

      var headFields = document.createElement("div");
      headFields.className = "category-head-fields";
      headFields.appendChild(field("Category key (short, no spaces)", textInput(cat.key, function (v) { cat.key = v; })));
      headFields.appendChild(field("Category label (shown to guests)", textInput(cat.label, function (v) { cat.label = v; })));
      var noteField = field("Note (optional, shown under the category title)", textArea(cat.note, function (v) { cat.note = v; }, 2));
      noteField.className = "full";
      headFields.appendChild(noteField);
      head.appendChild(headFields);

      var controls = document.createElement("div");
      controls.className = "category-controls";
      controls.appendChild(iconBtn("fa-arrow-up", "Move category up", function () {
        if (catIdx === 0) return;
        categories.splice(catIdx - 1, 0, categories.splice(catIdx, 1)[0]);
        markDirty(); renderSection(sectionKey);
      }));
      controls.appendChild(iconBtn("fa-arrow-down", "Move category down", function () {
        if (catIdx === categories.length - 1) return;
        categories.splice(catIdx + 1, 0, categories.splice(catIdx, 1)[0]);
        markDirty(); renderSection(sectionKey);
      }));
      controls.appendChild(iconBtn("fa-trash", "Delete category", function () {
        if (!confirm('Delete the "' + (cat.label || cat.key) + '" category and all its items?')) return;
        categories.splice(catIdx, 1);
        markDirty(); renderSection(sectionKey);
      }, true));
      head.appendChild(controls);
      card.appendChild(head);

      var itemsWrap = document.createElement("div");
      itemsWrap.className = "items-table";

      cat.items.forEach(function (item, itemIdx) {
        var row = document.createElement("div");
        row.className = "item-row";

        row.appendChild(field("Name", textInput(item.name, function (v) { item.name = v; })));
        row.appendChild(field("Price", textInput(item.price, function (v) { item.price = v; })));
        row.appendChild(field("Description", textArea(item.desc, function (v) { item.desc = v; }, 2)));

        var flags = document.createElement("div");
        flags.className = "item-flags";
        flags.appendChild(checkbox(item.special, " Chef's special", function (v) { item.special = v || undefined; }));
        if (isSetlunch) {
          var headingInput = textInput(item.heading, function (v) { item.heading = v || undefined; });
          headingInput.placeholder = "e.g. Main Course";
          flags.appendChild(field("Heading", headingInput));
          flags.appendChild(checkbox(item.orAlt, " \"or\" alt. choice", function (v) { item.orAlt = v || undefined; }));
        }
        row.appendChild(flags);

        var itemControls = document.createElement("div");
        itemControls.className = "item-controls";
        itemControls.appendChild(iconBtn("fa-arrow-up", "Move up", function () {
          if (itemIdx === 0) return;
          cat.items.splice(itemIdx - 1, 0, cat.items.splice(itemIdx, 1)[0]);
          markDirty(); renderSection(sectionKey);
        }));
        itemControls.appendChild(iconBtn("fa-arrow-down", "Move down", function () {
          if (itemIdx === cat.items.length - 1) return;
          cat.items.splice(itemIdx + 1, 0, cat.items.splice(itemIdx, 1)[0]);
          markDirty(); renderSection(sectionKey);
        }));
        itemControls.appendChild(iconBtn("fa-trash", "Delete item", function () {
          cat.items.splice(itemIdx, 1);
          markDirty(); renderSection(sectionKey);
        }, true));
        row.appendChild(itemControls);

        itemsWrap.appendChild(row);
      });
      card.appendChild(itemsWrap);

      var addItemBtn = document.createElement("button");
      addItemBtn.type = "button";
      addItemBtn.className = "btn btn-ghost btn-sm add-item-btn";
      addItemBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add item';
      addItemBtn.addEventListener("click", function () {
        cat.items.push({ name: "New item", price: "", desc: "" });
        markDirty(); renderSection(sectionKey);
      });
      card.appendChild(addItemBtn);

      els.sectionContent.appendChild(card);
    });
  }

  els.addCategoryBtn.addEventListener("click", function () {
    var categories = state.data[state.currentTab] || (state.data[state.currentTab] = []);
    categories.push({ key: "new-category", label: "New Category", items: [{ name: "New item", price: "", desc: "" }] });
    markDirty();
    renderSection(state.currentTab);
  });

  /* ===== save flow ===== */
  function saveChanges() {
    var newText = serializeMenuData(state.data);
    if (newText === state.originalText) {
      els.saveStatus.textContent = "No changes to save.";
      return;
    }

    els.saveBtn.disabled = true;
    els.saveStatus.classList.remove("error");
    els.saveStatus.textContent = "Preparing your changes…";

    var branchName = "menu-update-" + Date.now();

    ghFetch("/repos/" + REPO_OWNER + "/" + REPO_NAME + "/git/ref/heads/" + BASE_BRANCH)
      .then(function (refRes) {
        var baseSha = refRes.object.sha;
        els.saveStatus.textContent = "Creating a branch…";
        return ghFetch("/repos/" + REPO_OWNER + "/" + REPO_NAME + "/git/refs", {
          method: "POST",
          body: { ref: "refs/heads/" + branchName, sha: baseSha }
        });
      })
      .then(function () {
        els.saveStatus.textContent = "Saving your changes…";
        return ghFetch("/repos/" + REPO_OWNER + "/" + REPO_NAME + "/contents/" + FILE_PATH, {
          method: "PUT",
          body: {
            message: "Update menu via admin editor",
            content: b64EncodeUnicode(newText),
            sha: state.fileSha,
            branch: branchName
          }
        });
      })
      .then(function () {
        els.saveStatus.textContent = "Opening a pull request for review…";
        return ghFetch("/repos/" + REPO_OWNER + "/" + REPO_NAME + "/pulls", {
          method: "POST",
          body: {
            title: "Menu update — " + new Date().toLocaleDateString(),
            head: branchName,
            base: BASE_BRANCH,
            body: "Menu changes submitted through the admin editor. Merging this will publish the changes to the live site."
          }
        });
      })
      .then(function (pr) {
        state.dirty = false;
        state.originalText = newText;
        els.saveStatus.innerHTML = 'Submitted! <a href="' + pr.html_url + '" target="_blank" rel="noopener">View the pull request &rarr;</a> It will go live once approved and merged.';
      })
      .catch(function (e) {
        els.saveStatus.classList.add("error");
        els.saveStatus.textContent = "Couldn't save: " + e.message;
      })
      .finally(function () {
        els.saveBtn.disabled = false;
      });
  }

  /* ===== wire up ===== */
  els.connectBtn.addEventListener("click", function () {
    var token = els.tokenInput.value.trim();
    if (!token) return;
    connect(token);
  });
  els.tokenInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") els.connectBtn.click();
  });
  els.disconnectBtn.addEventListener("click", disconnect);
  els.saveBtn.addEventListener("click", saveChanges);

  window.addEventListener("beforeunload", function (e) {
    if (state.dirty) { e.preventDefault(); e.returnValue = ""; }
  });

  var savedToken = localStorage.getItem(TOKEN_KEY);
  if (savedToken) connect(savedToken);
})();
