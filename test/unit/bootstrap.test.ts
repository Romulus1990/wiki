// tslint:disable-next-line: no-reference
/// <reference path="../../src/types.d.ts" />

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

import Redis from 'src/redis';
import test from 'blue-tape';
import { config } from '../../src/config';
import { articleDetailXId, redirectsXId, requestCacheXUrl, filesToDownloadXPath, populateArticleDetail, populateRedirects, populateFilesToDownload, populateRequestCache } from 'src/stores';

const redis = new Redis({ redis: process.env.REDIS }, config);
populateArticleDetail(redis.redisClient);
populateRedirects(redis.redisClient);
populateFilesToDownload(redis.redisClient);
populateRequestCache(redis.redisClient);

test.onFinish(() => {
    console.info('Closing all redis connections');
    articleDetailXId.flush();
    redirectsXId.flush();
    filesToDownloadXPath.flush();
    requestCacheXUrl.flush();
    redis.redisClient.quit();
});
