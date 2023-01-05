import st{ getOfferById, updateOffer } from '../api/offers.js';
import { html } from '../library.js';

const editTemplate = (offer, onSubmit) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit Offer</h2>
            <form @submit="${onSubmit}" class="edit-form">
                <input
                        type="text"
                        name="name"
                        id="product-name"
                        placeholder="Product name"
                        .value="${offer.name}"
                />
                <input
                        type="file"
                        name="imageUrl"
                        id="product-image"
                        accept="image/jpeg, image/jpg, image/png"
                />
                <select name="category" id="offer-category">
                    <option value="Groceries">Groceries</option>
                    <option value="Office materials">Office materials</option>
                    <option value="Building materials">Building materials</option>
                        .value="${offer.category}"
                </select>
                <textarea
                        name="description"
                        id="product-description"
                        placeholder="Description"
                        rows="4"
                        cols="50"
                        .value="${offer.description}"
                ></textarea>
                <input
                        type="number"
                        min="0"
                        name="buy-price"
                        id="buy-price"
                        placeholder="Purchase price"
                        .value="${offer.buyPrice}"
                >
                <input
                        type="number"
                        min="0"
                        name="sell-price"
                        id="sell-price"
                        placeholder="Sell price"
                        .value="${offer.sellPrice}"
                />
                <input
                        type="number"
                        min="0"
                        name="quantity"
                        id="quantity"
                        placeholder="Quantity"
                        .value="${offer.quantity}"
                >
                <input
                        type="text"
                        id="code"
                        name="code"
                        placeholder="Barcode"
                        .value="${offer.code}"
                >

                <button type="submit">post</button>
            </form>
        </div>
    </section>
`;

export async function editView(ctx) {
    const offer = await getOfferById(ctx.params.id);

    ctx.render(editTemplate(offer, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const imageFile = formData.get('imageUrl');
        const reader = new FileReader();

        // Set the onload event handler
        reader.onload = async function (e) {
            // Convert the file to a base64 encoded string
            const imageUrl = e.target.result;

            // Create the offer object using the base64 encoded string
            const offer = {
                name: formData.get('name'),
                imageUrl: imageUrl, // TODO: Fix if no image is added - it gets removed
                category: formData.get('category'),
                description: formData.get('description'),
                buyPrice: formData.get('buy-price'),
                sellPrice: formData.get('sell-price'),
                quantity: formData.get('quantity'),
                code: formData.get('code') // TODO: Make unique
            }

            if (
                offer.name === '' || offer.category === '' ||
                offer.buyPrice === '' || offer.sellPrice === '' || offer.quantity === '' || offer.code === '') {
                return alert('Must enter all the required fields!');
            }

            await updateOffer(ctx.params.id, offer);

            event.target.reset();
            ctx.page.redirect('/offers');
        }

        event.target.reset();
        ctx.page.redirect('/offers');

        // Read the image file and trigger the onload event handler
        reader.readAsDataURL(imageFile);
    }
}
