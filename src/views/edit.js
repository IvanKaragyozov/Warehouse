import { getOfferById, updateOffer } from '../api/offers.js';
import { html } from '../library.js';

const editTemplate = (offer, onSubmit) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit Offer</h2>
            <form @submit="${onSubmit}" class="edit-form">
                <input
                        type="text"
                        name="name"
                        id="job-title"
                        placeholder="Product name"
                        .value="${offer.name}"
                />
                <input
                        type="text"
                        name="imageUrl"
                        id="job-logo"
                        placeholder="Item picture"
                        .value="${offer.imageUrl}"
                />
                <input
                        type="text"
                        name="category"
                        id="job-category"
                        placeholder="Category"
                        .value="${offer.category}"
                />
                <textarea
                        id="job-description"
                        name="description"
                        placeholder="Description"
                        rows="4"
                        cols="50"
                        .value="${offer.description}"
                ></textarea>
                <input
                        type="text"
                        name="buy-price"
                        id="buy-price"
                        placeholder="Purchase price"
                        .value="${offer.buyPrice}"
                >
                <input
                        type="text"
                        name="sell-price"
                        id="sell-price"
                        placeholder="Sell price"
                        .value="${offer.sellPrice}"
                />
                <input
                        type="text"
                        id="quantity"
                        name="quantity"
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

        await updateOffer(ctx.params.id, offer);

        event.target.reset();
        ctx.page.redirect('/offers/' + ctx.params.id);

    }
}
