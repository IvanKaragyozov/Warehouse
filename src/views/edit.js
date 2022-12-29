import { getOfferById, updateOffer } from '../api/offers.js';
import { html } from '../library.js';

const editTemplate = (offer, onSubmit) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit Offer</h2>
            <form @submit="${onSubmit}" class="edit-form">
                <input
                        type="text"
                        name="title"
                        id="job-title"
                        placeholder="Title"
                        .value="${offer.title}"
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
                <textarea
                        id="item-info"
                        name="info"
                        placeholder="Additional info"
                        rows="4"
                        cols="20"
                        .value="${offer.info}"
                ></textarea>
                <input
                        type="text"
                        name="price"
                        id="item-price"
                        placeholder="Price"
                        .value="${offer.price}"
                />

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
            title : formData.get('title'),
            imageUrl: formData.get('imageUrl'),
            category: formData.get('category'),
            description: formData.get('description'),
            info: formData.get('info'),
            price: formData.get('price')
        };

        if (offer.title === '' || offer.imageUrl === '' || offer.category === '' || offer.description === '' || offer.info === '' || offer.price === '') {
            return alert('All fields are required!');
        }

        await updateOffer(ctx.params.id, offer);

        event.target.reset();
        ctx.page.redirect('/offers/' + ctx.params.id);

    }
}
