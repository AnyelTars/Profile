# Angel Salazar — Research portfolio

A static academic website in English, prepared for GitHub Pages. No dependencies or build step.

## Preview locally

From this directory:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Stop the server with Ctrl+C.

## Content

- `index.html`: homepage and three research areas.
- `bio.html`: biography, academic background, CV, and contact.
- `condensed-matter.html`: condensed matter research.
- `astrophysics.html`: astrophysics research.
- `quantum-photonics.html`: photonic cavity / quantum dot research using FDTD.
- `assets/style.css`: shared design and responsive layouts.
- `assets/site.js`: accessible mobile navigation and atom animation controls.
- `assets/field.svg`: original decorative mathematical illustration, retained as an unused asset.
- The homepage includes a lightweight canvas background of stylized atoms drifting in random directions across the viewport, a pause control, and support for reduced motion. Atom symbols are decorative, not simulation data. Animation suspends while the browser tab is hidden.

Biography and research experience are based on the CV supplied by Angel Salazar. Astrophysics content is based on the supplied arXiv:2605.10497v1 PDF; the two extracted plots are original Figures 3 (p. 10) and 5 (p. 11). Journal citation and other publication statuses follow the supplied CV. Individual author tasks are not inferred from authorship. The full CV, phone number, and reference contact details are not copied into the public site.

Condensed Matter content follows the supplied `ctf-iop-article.tex` and `abstract-original.tex` manuscript, marked under review for Journal of Physics: Conference Series. Its two web-sized images come from `CTF-introduction.png` (structural illustration) and `bulk-bandPdos-tbt.png` (TBT-AA projected bands/PDOS). Numerical results describe the PBE-D3 study; updated MLFF work is not represented as a completed result. The unpublished manuscript is not bundled as a public download.

Quantum Photonics covers the supplied report `Design and Simulation of Nanophotonic Devices` and saved outputs of `Bullseye-Bowtie.ipynb`. The two images are embedded PNG outputs from notebook cells 9 (geometry) and 20 (spectrum), extracted without running code or simulations. The report provides approximate cavity factors and the separate island/coupler results; notebook-specific metrics and normalizations are described separately. The notebook collection fraction is normalized to the upward hemisphere, and the flux enhancement uses an unpatterned SOI reference.

The QD 2026 poster is verified in the final program: P2-23, PDF page 15; Poster Session 2 timing is on PDF page 14. The supplied URL is the final program, not a full abstract text. The GitHub repository is linked as supplied; its contents were not accessible through the browsing tool. The report and notebook are not bundled as public downloads. Replace those passages with actual research material before sharing with admissions committees. Add figures under `assets/` with descriptive alternative text and captions. The biography currently offers a CV by email; a public PDF can be added and linked later if desired.

All internal paths are relative so the website works under `/Profile/` and from a local server.

## Publish with GitHub Pages

After reviewing the site, commit and push the files to the repository. In GitHub, open **Settings → Pages**, select **Deploy from a branch**, choose the branch containing these files and **/ (root)**, and save.

For the current remote, the expected address is https://anyeltars.github.io/Profile/ once GitHub Pages is enabled and deployment completes.
