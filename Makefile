install:
		npm ci


gendiff:
		node bin/gendiff


publish:
		npm publish --dry-run


lint:
		npx eslint .


test: 

		npm test


test-coverage:

		npm test -- --coverageProvider=v8


.PHONY: test