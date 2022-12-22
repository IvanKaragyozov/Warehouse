import { deleteOffer, getOfferById } from '../api/offers.js';
import {html, nothing} from '../library.js';
import { getUserData } from '../util.js';

export const detailsTemplate = (offer, isOwner, onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${offer.imageUrl}" alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
                Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
                Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description</h4>
                    <span>${offer.description}</span>
                </div>
                <div id="details-requirements">
                    <h4>Requirements</h4>
                    <span>${offer.requirements}</span>
                </div>
            </div>
            <p>Applications: <strong id="applications">1</strong></p>
            
            ${isOwner
            ? html
            `<div id="action-buttons">
                <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                <a @click="${onDelete}" href="" id="delete-btn">Delete</a>
            </div>`
            : nothing}
            
            ${!isOwner && getUserData()
            ? html`<a href="" id="apply-btn">Apply</a>`
            : nothing}
        </div>
    </section>
`;

export async function detailsView(ctx) {
    const offer = await getOfferById(ctx.params.id);
    const userData = getUserData();

    const isOwner = userData?.id === offer._ownerId;

    ctx.render(detailsTemplate(offer, isOwner, onDelete));

    async function onDelete() {
        await deleteOffer(ctx.params.id);
        ctx.page.redirect('/offers');
    }

}


