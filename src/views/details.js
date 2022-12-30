import { deleteOffer, getOfferById } from '../api/offers.js';
import {html, nothing} from '../library.js';
import { getUserData } from '../util.js';

export const detailsTemplate = (offer, isUser, onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${offer.imageUrl}" alt="example1"/>
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
                Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-price">
                Price: <span id="price-number">${offer.price} $</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description:</h4>
                    <span>${offer.description}</span>
                </div>
                <div id="details-requirements">
                    <h4>Additional info:</h4>
                    <span>${offer.info}</span>
                </div>
            </div>
            <p>Quantity: <strong id="quantity">${offer.size}</strong></p> <!-- TODO: does not show quantity of the offer -->

            ${isUser
                    ? html
                            `
                                <div id="action-buttons">
                                    <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                                    <a @click="${onDelete}" href="" id="delete-btn">Delete</a>
                                </div>`
                    : nothing}
        </div>
    </section>
`;

export async function detailsView(ctx) {
    const offer = await getOfferById(ctx.params.id);
    const userData = getUserData();

    const isUser = userData?.id;

    ctx.render(detailsTemplate(offer, isUser, onDelete));

    async function onDelete() {
        await deleteOffer(ctx.params.id);
        ctx.page.redirect('/offers');
    }

}


