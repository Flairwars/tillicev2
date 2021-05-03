const axios = require('axios')

let AuthHeader = {
        Authorization: 'Basic ' + process.env.FWAPI_SECRET
    }

let BaseURL = 'https://api.flairwars.com'

module.exports.GetAllUsers = () => {
    return axios.get(BaseURL+'/users')
}

module.exports.GetUsersByColor = (color) => {
    return axios.get(BaseURL+'/users', { params: {FlairwarsColor: color} })
}

module.exports.GetUserByName = (username) => {
    return axios.get(BaseURL+'/users', { params: {RedditUsername: username} })
}

module.exports.GetUserByID = (memberID) => {
    return axios.get(BaseURL+'/users', { params: {DiscordMemberID: memberID} })
}

module.exports.CreateUserIDOnly = (memberID) => {
    return axios.post(BaseURL+'/users', {
        DiscordMemberID: memberID
    }, {
        headers: AuthHeader
    })
}

module.exports.CreateFullUser = (memberID, redditUsername, fwColor) => {
    return axios.post(BaseURL+'/users', {
        DiscordMemberID: memberID,
        FlairwarsColor: fwColor,
        RedditUsername: redditUsername
    }, {
        headers: AuthHeader
    })
}

module.exports.UpdateUser = (memberID, redditUsername, fwColor) => {
    return axios.put(BaseURL+`/users/id/${memberID}`, {
        FlairwarsColor: fwColor,
        RedditUsername: redditUsername
    }, {
        headers: AuthHeader
    })
}

module.exports.UpdateUserRedditName = (memberID, redditUsername) => {
    return axios.put(BaseURL+`/users/id/${memberID}`, {
        RedditUsername: redditUsername
    }, {
        headers: AuthHeader
    })
}

module.exports.UpdateUserFWColor = (memberID, fwColor) => {
    return axios.put(BaseURL+`/users/id/${memberID}`, {
        FlairwarsColor: fwColor
    }, {
        headers: AuthHeader
    })
}

module.exports.UpdateUserNickname = (memberID, nick) => {
    return axios.put(BaseURL+`/users/id/${memberID}`, {
        MemberNickname: nick
    }, {
        headers: AuthHeader
    })
}

module.exports.GetCurrencies = () => {
    return axios.get(BaseURL+`/currencies`)
}

module.exports.GetCurrencyByName = (currencyName) => {
    return axios.get(BaseURL+`/currencies`, {params: {Name: currencyName}})
}

module.exports.GetCurrencyBySymbol = (currencySymbol) => {
    return axios.get(BaseURL+`/currencies`, {params: {Symbol: currencySymbol}})
}

module.exports.GetCurrencyQuery = (query) => {
    // Query must include either Name, Symbol, or both
    return axios.get(BaseURL+`/currencies`, {params: query})
}

module.exports.CreateCurrency = (currencyName, currencySymbol) => {
    return axios.post(BaseURL+`/currencies`, {
        Name: currencyName,
        Symbol: currencySymbol
    }, {
        headers: AuthHeader
    })
}

module.exports.GetCurrencyByID = (currencyID) => {
    return axios.get(BaseURL+`/currencies/${currencyID}`)
}

module.exports.DeleteCurrency = (currencyID) => {
    return axios.delete(BaseURL+`/currencies/${currencyID}`, {
        headers: AuthHeader
    })
}

module.exports.UpdateCurrency = (currencyID, currencyName, currencySymbol) => {
    return axios.put(BaseURL+`/currencies/${currencyID}`, {
        Name: currencyName,
        Symbol: currencySymbol
    },
    {
        headers: AuthHeader
    })
}

module.exports.MintCurrency = (currencyID, amount) => {
    return axios.put(BaseURL+`/currencies/${currencyID}/mint`, {
        params: {
            amount: amount
        },
        headers: AuthHeader
    })
}

module.exports.DestroyCurrency = (currencyID, amount) => {
    return axios.delete(BaseURL+`/currencies/${currencyID}/mint`, {
        params: {
            amount: amount
        },
        headers: AuthHeader
    })
}

module.exports.GetTransactions = () => {
    return axios.get(BaseURL+`/transactions`)
}

module.exports.GetTransactionsInDateRange = (fromDate, toDate) => {
    return axios.get(BaseURL+`/transactions`, {
        params: {
            fromDate: fromDate.toISOString().split('T')[0],
            toDate: toDate.toISOString().split('T')[0]
        }
    })
}

module.exports.GetTransactionsInValueRange = (fromValue, toValue) => {
    return axios.get(BaseURL+`/transactions`, {
        params: {
            lessThan: toValue,
            greaterThan: fromValue
        }
    })
}

module.exports.GetTransactionsByType = (transactionType) => {
    return axios.get(BaseURL+`/transactions`, {
        params: {
            type: transactionType
        }
    })
}

module.exports.GetTransactionsFrom = (fromEntity) => {
    return axios.get(BaseURL+`/transactions`, {
        params: {
            from: fromEntity
        }
    })
}

module.exports.GetTransactionsTo = (toEntity) => {
    return axios.get(BaseURL+`/transactions`, {
        params: {
            to: toEntity
        }
    })
}

let BaseTransactionBuilder = (type, from, to, amount, description, fromCurrency, toCurrency) => {
    return {
        Type: type,
        From: from,
        To: to,
        Amount: amount,
        Desc: description,
        FromCurrency: fromCurrency,
        ToCurrency: toCurrency
    }
}

module.exports.CreateWithdrawal = (fromBank, toUser, amount, description) => {
    return axios.post(BaseURL+`/transactions`, 
        BaseTransactionBuilder('Withdrawal', fromBank, toUser, amount, description, 'None', 'None'),
        {
            headers: AuthHeader
        }
    )
}

module.exports.CreateDeposit = (fromUser, toBank, amount, description) => {
    return axios.post(BaseURL+`/transactions`, 
        BaseTransactionBuilder('Deposit', fromUser, toBank, amount, description, 'None', 'None'),
        {
            headers: AuthHeader
        }
    )
}

module.exports.CreateUserTransfer = (fromUser, toUser, amount, description, fromCurrency, toCurrency) => {
    return axios.post(BaseURL+`/transactions`, 
        BaseTransactionBuilder('Deposit', fromUser, toUser, amount, description, fromCurrency, toCurrency),
        {
            headers: AuthHeader
        }
    )
}

module.exports.CreateBankExchange = (fromBank, toBank, amount, description) => {
    return axios.post(BaseURL+`/transactions`, 
        BaseTransactionBuilder('BankExchange', fromBank, toBank, amount, description, 'None', 'None'),
        {
            headers: AuthHeader
        }
    )
}

module.exports.CreateUserExchange = (fromUser, toBank, amount, description, fromCurrency, toCurrency) => {
    return axios.post(BaseURL+`/transactions`, 
        BaseTransactionBuilder('UserExchange', fromUser, toBank, amount, description, fromCurrency, toCurrency),
        {
            headers: AuthHeader
        }
    )
}

module.exports.HATEOASGet = (path) => {
    return axios.get(BaseURL+path)
}