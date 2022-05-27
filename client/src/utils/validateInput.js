module.export = {
    validateInput(value, type) {
        switch (type) {
            case 'username':
                if (value.length < 3) {
                    return 'Username must be at least 3 characters'
                }
                if (value.length > 15) {
                    return 'Username must be less than 15 characters'
                }
                if (!/^[a-zA-Z0-9]+$/.test(value)) {
                    return 'Username can only contain letters and numbers'
                }
                break
            case 'email':
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    return 'Invalid email address'
                }
                break
            case 'password':
                if (value.length < 6) {
                    return 'Password must be at least 6 characters'
                }
                if (value.length > 15) {
                    return 'Password must be less than 15 characters'
                }
                // password must contain at least one number one letter and one special character
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)) {
                    return 'Password must contain at least one number, one letter and one special character'
                }
                break
            case 'bio':
                if (value.length > 160) {
                    return 'Bio must be less than 160 characters'
                }
                break
            case 'name':
                if (value.length > 15) {
                    return 'Name must be less than 15 characters'
                }
                if (value.length < 3) {
                    return 'Name must be at least 3 characters'
                }
                if (!/^[a-zA-Z]+$/.test(value)) {
                    return 'Name can only contain letters'
                }
                break
        }
    }
}