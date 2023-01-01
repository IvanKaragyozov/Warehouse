import { createOffer } from '../api/offers.js';
import { html } from '../library.js';

const createTemplate = (onSubmit) => html`
    <section id="create">
        <div class="form">
            <h2>New Item</h2>
            <form @submit="${onSubmit}" class="create-form">
                <input
                        type="text"
                        name="name"
                        id="product-name"
                        placeholder="Product name"
                />
                <input
                        type="text"
                        name="imageUrl"
                        id="product-image"
                        placeholder="Item picture"
                        accept=".jpeg, .jpg, .png"
                />
                <select name="category" id="offer-category">
                    <option value="Groceries">Groceries</option>
                    <option value="Stationery">Stationery</option>
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
                        type="text"
                        name="buy-price"
                        id="buy-price"
                        placeholder="Purchase price"
                />
                <input
                        type="text"
                        name="sell-price"
                        id="sell-price"
                        placeholder="Sell price"
                />
                <input
                        type="text"
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

        const offer = {
            name : formData.get('name'),
            imageUrl: formData.get('imageUrl'),
            category: formData.get('category'),
            description: formData.get('description'),
            buyPrice: formData.get('buy-price'),
            sellPrice: formData.get('sell-price'),
            quantity: formData.get('quantity'),
            code: formData.get('code')
        }

        if (
            offer.name === '' || offer.imageUrl === '' || offer.category === '' ||
            offer.description === '' || offer.buyPrice === '' || offer.sellPrice === '' || offer.quantity === '' || offer.code === '') {
            return alert('All fields are required!');
        }

        await createOffer(offer);

        event.target.reset();
        ctx.page.redirect('/offers');
    }
}