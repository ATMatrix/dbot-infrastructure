const language = require('@google-cloud/language')

module.exports = class GoogleLanguage {
  constructor(config = {}) {
		this.client = new language.LanguageServiceClient(config)
  }

  async query({
    text,
  } = {}) {
    if (!text) throw 'text to be processed required'

    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    }

    return this.client
      .analyzeSyntax({ document })
      .then(res => JSON.stringify(res, null, 2))
  }
}
