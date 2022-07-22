export default {
    created (e) {
        console.log('created', e);
    },
    beforemount (e) {
        console.log('beforemount', e);
    },
    mounted (e) {
        console.log('mounted', e);
    },
    unmount (e) {
        console.log('unmount', e);
    },
    error (e) {
        console.log('error', e);
    }
};
