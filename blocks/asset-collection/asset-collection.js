export default function decorate(block) {
  // Universal Editor injects block config as dataset or you can fetch as meta-data, depending on setup
  const assets = block.dataset.approvedAssets ? JSON.parse(block.dataset.approvedAssets) : [];
  const title = block.dataset.collectionTitle || '';
  const contentHubUrl = block.dataset.contentHubUrl || '#';

  // Collection title
  if (title) {
    const header = document.createElement('h2');
    header.textContent = title;
    block.appendChild(header);
  }

  // Asset previews
  const list = document.createElement('div');
  list.className = 'asset-collection-list';

  assets.forEach(asset => {
    const assetDiv = document.createElement('div');
    assetDiv.className = 'asset-collection-item';

    // Approved asset will have a delivery url (src), alt, maybe a preview thumb.
    const img = document.createElement('img');
    img.src = asset.href || asset.url || asset['repo:deliveryUrl']; // fallback logic
    img.alt = asset.title || asset['repo:name'] || '';
    assetDiv.appendChild(img);

    // Optional: Link image to asset or asset details in Content Hub
    // const a = document.createElement('a');
    // a.href = asset.href;
    // a.appendChild(img);
    // assetDiv.appendChild(a);

    list.appendChild(assetDiv);
  });
  block.appendChild(list);

  // CTA to Content Hub
  if (contentHubUrl && contentHubUrl !== '#') {
    const cta = document.createElement('a');
    cta.className = 'asset-collection-chub-link';
    cta.href = contentHubUrl;
    cta.target = '_blank';
    cta.rel = 'noopener noreferrer';
    cta.textContent = 'See Full Collection in Content Hub';
    block.appendChild(cta);
  }
}