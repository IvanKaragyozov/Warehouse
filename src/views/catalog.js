import { getAllOffers } from '../api/offers.js';
import { html } from '../library.js';

const catalogTemplate = (offers) => html`
    <section id="dashboard">
        <h2>Supplies</h2>
        <ul class="offer-wrapper">
            <!-- Display products if there are any -->
            ${offers.length === 0
            ? html`<h2>There are no products yet.</h2>`
            : offers.map(offerCard)}
        </ul>
    </section>
`;

const offerCard = (offer) => html`
    <li class="offer">
        <img src="${offer.imageUrl}" alt="example1"/>
        <p>
            <strong><span class="title">${offer.title}</span></strong>
        </p>
        <p><strong>Price:</strong><span class="price">${offer.price} $</span></p>
        <a class="details-btn" href="/offers/${offer._id}">Details</a>
    </li>
`;


export async function catalogView(ctx) {
    const offers = await getAllOffers();
    ctx.render(catalogTemplate(offers));
}
