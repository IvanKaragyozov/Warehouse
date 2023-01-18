import { createOffer } from '../api/offers.js';
import { html } from '../library.js';

const createTemplate = (onSubmit) => html`
    <section id="create">
        <div class="form">
            <h2>New Item</h2>
            <form @submit="${onSubmit}" class="create-form" method="post">
                <input
                        type="text"
                        name="name"
                        id="product-name"
                        placeholder="Product name"
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
                </select>
                <textarea
                        name="description"
                        id="product-description"
                        placeholder="Description"
                        rows="4"
                        cols="50"
                ></textarea>
                <input
                        type="number"
                        min="0"
                        step="0.01"
                        name="buy-price"
                        id="buy-price"
                        placeholder="Purchase price"
                />
                <input
                        type="number"
                        min="0"
                        step="0.01"
                        name="sell-price"
                        id="sell-price"
                        placeholder="Sell price"
                />
                <input
                        type="number"
                        min="0"
                        id="quantity"
                        name="quantity"
                        placeholder="Quantity"
                >
                <input
                        type="text"
                        id="code"
                        name="code"
                        placeholder="Barcode"
                >

                <button type="submit">create</button>
            </form>
        </div>
    </section>
`;

export function createView(ctx) {

    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const imageFile = formData.get('imageUrl');

        const reader = new FileReader();

        // Set the onload event handler
        reader.onload = async function (e) {
            // Convert the file to a base64 encoded string
            const imageUrl = e.target.result;

            const offer = {
                name: formData.get('name'),
                imageUrl: imageUrl,
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

            await createOffer(offer);
            console.log(offer);

            event.target.reset();
            ctx.page.redirect('/offers');
        }

        ctx.page.redirect('/create');

        // Read the image file and trigger the onload event handler
        reader.readAsDataURL(imageFile);
    }

}