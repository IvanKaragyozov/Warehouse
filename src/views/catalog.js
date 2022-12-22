import { getAllOffers } from '../api/offers.js';
import { html } from '../library.js';

const catalogTemplate = (offers) => html`
    <section id="dashboard">
        <h2>Supplies</h2>

        <!-- Display a div with information about every post (if any)-->
        ${offers.length === 0
        ? html`<h2>No offers yet.</h2>`
        : offers.map(offerCard)}

    </section>
`;

const offerCard = (offer) => html`
    <div class="offer">
        <img src="${offer.imageUrl}" alt="example1" />
        <p>
            <strong>Title: </strong><span class="title">${offer.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
        <a class="details-btn" href="/offers/${offer._id}">Details</a>
    </div>
`;


export async function catalogView(ctx) {
    const offers = await getAllOffers();
    ctx.render(catalogTemplate(offers));
}
