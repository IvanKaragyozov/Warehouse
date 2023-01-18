import { deleteOffer, getOfferById } from '../api/offers.js';
import { html, nothing } from '../library.js';
import { getUserData } from '../util.js';

export const detailsTemplate = (offer, isUser, onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${offer.imageUrl}" alt="example1"/>
            <p id="details-name">${offer.name}</p>
            <p id="details-category">
                Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-price">
                Bought price: <span id="price-number">${offer.buyPrice} $</span>
            </p>
            <p id="details-price">
                Selling price: <span id="sellPrice-number">${offer.sellPrice} $</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description:</h4>
                    <span>${offer.description}</span>
                </div>
                <div id="details-barcode">
                    <h4>Barcode:</h4>
                    <span>${offer.code}</span>
                </div>
            </div>
            <p>Quantity: <strong id="quantity">${offer.quantity}</strong></p>

            ${isUser
                    ? html
                            `
                                <div id="action-buttons">
                                    <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                                    <a @click="${onDelete}" href="javascript:void(0)" id="delete-btn">Delete</a>
                                </div>`
                    : nothing }
        </div>
    </section>
`;

export async function detailsView(ctx) {
    const offer = await getOfferById(ctx.params.id);
    const userData = getUserData();

    const isUser = userData?.id;

    ctx.render(detailsTemplate(offer, isUser, onDelete));

    async function onDelete() {
        const confirmMessage = confirm("Are you sure you want to delete this item?");

        if (confirmMessage) {
            await deleteOffer(ctx.params.id);
        } else return;

        ctx.page.redirect('/offers');
    }

}


