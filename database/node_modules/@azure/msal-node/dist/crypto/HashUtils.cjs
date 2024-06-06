/*! @azure/msal-node v2.9.1 2024-06-04 */
'use strict';
'use strict';

var Constants = require('../utils/Constants.cjs');
var crypto = require('crypto');

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class HashUtils {
    /**
     * generate 'SHA256' hash
     * @param buffer
     */
    sha256(buffer) {
        return crypto.createHash(Constants.Hash.SHA256).update(buffer).digest();
    }
}

exports.HashUtils = HashUtils;
//# sourceMappingURL=HashUtils.cjs.map
