import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service'

export default class BookRoute extends Route {
    @tracked newTitle = '';
    @tracked newIsbn = '';

    @service store;

    model() {
        return this.store.findAll('book');
    }

    @action
    createBook(event) {
        event.preventDefault();
        // Create the new book
        const book = this.store.createRecord('book', {
            title: this.newTitle,
            isbn: this.newIsbn
        });
        book.save();
        // Clear the input fields
        this.newTitle = '';
        this.newIsbn = '';
    }

    @action
    removeBook( book, event ) {
        event.preventDefault();
        book.destroyRecord();
    }
}
