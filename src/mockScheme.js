import { BaseScheme } from '~auth/runtime';

export default class MockScheme extends BaseScheme {
    check() {
        const loggedIn = this.$auth.loggedIn || this.$auth.$storage.getUniversal(MockScheme.storageKey);

        if (loggedIn) {
            return {
                valid: true,
            };
        }

        return {
            valid: false,
        };
    }

    mounted() {
        const { valid } = this.check();

        if (valid) {
            this.setLoggedIn(true);
        }
    }

    login({ data }) {
        if (data.email === this.options.email && data.password === this.options.password) {
            if (data.remember) {
                this.$auth.$storage.setUniversal(MockScheme.storageKey, true);
            }
            this.setLoggedIn(true);
            return true;
        }

        return false;
    }

    setLoggedIn(logged) {
        this.$auth.$storage.setUniversal('loggedIn', logged);
        this.$auth.setUser(logged ? this.options.user : null);
    }

    logout() {
        this.setLoggedIn(false);
        this.$auth.$storage.removeUniversal(MockScheme.storageKey);
    }

    static get storageKey() {
        return 'Ok';
    }
}
