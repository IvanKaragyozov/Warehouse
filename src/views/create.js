import { createOffer } from '../api/offers.js';
import { html } from '../library.js';

const createTemplate = (onSubmit) => html`
    <section id="create">
        <div class="form">
            <h2>New Item</h2>
            <form @submit="${onSubmit}" class="create-form">
                <input
                        type="text"
                        name="title"
                        id="job-title"
                        placeholder="Title"
                />
                <input
                        type="text"
                        name="imageUrl"
                        id="job-logo"
                        placeholder="Item picture"
                />
                <input
                        type="text"
                        name="category"
                        id="job-category"
                        placeholder="Category"
                />
                <textarea
                        id="job-description"
                        name="description"
                        placeholder="Description"
                        rows="4"
                        cols="50"
                ></textarea>
                <textarea
                        id="item-info"
                        name="info"
                        placeholder="Additional info"
                        rows="4"
                        cols="20"
                ></textarea>
                <input
                        type="text"
                        name="price"
                        id="item-price"
                        placeholder="Price"
                />

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
            title : formData.get('title'),
            imageUrl: formData.get('imageUrl'),
            category: formData.get('category'),
            description: formData.get('description'),
            info: formData.get('info'),
            price: formData.get('price')
        }

        if (offer.title === '' || offer.imageUrl === '' || offer.category === '' || offer.description === '' || offer.info === '' || offer.price === '') {
            return alert('All fields are required!');
        }

        await createOffer(offer);

        event.target.reset();
        ctx.page.redirect('/offers');
    }
}