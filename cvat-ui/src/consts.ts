// Copyright (C) 2019-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

const UNDEFINED_ATTRIBUTE_VALUE = '__undefined__';
const NO_BREAK_SPACE = '\u00a0';
const CHANGELOG_URL = 'https://github.com/openvinotoolkit/cvat/blob/develop/CHANGELOG.md';
const LICENSE_URL = 'https://github.com/openvinotoolkit/cvat/blob/develop/LICENSE';
const GITTER_URL = 'https://gitter.im/opencv-cvat';
const GITTER_PUBLIC_URL = 'https://gitter.im/opencv-cvat/public';
const FORUM_URL = 'https://software.intel.com/en-us/forums/intel-distribution-of-openvino-toolkit';
const GITHUB_URL = 'https://github.com/openvinotoolkit/cvat';
const GITHUB_IMAGE_URL =
    'https://github.com/openvinotoolkit/cvat/raw/develop/site/content/en/images/cvat.jpg';
const SHARE_MOUNT_GUIDE_URL =
    'https://openvinotoolkit.github.io/cvat/docs/administration/basics/installation/#share-path';
const NUCLIO_GUIDE =
    'https://openvinotoolkit.github.io/cvat//docs/administration/advanced/installation_automatic_annotation/';
const CANVAS_BACKGROUND_COLORS = ['#ffffff', '#f1f1f1', '#e5e5e5', '#d8d8d8', '#CCCCCC', '#B3B3B3', '#999999'];
const NEW_LABEL_COLOR = '#b3b3b3';
const LATEST_COMMENTS_SHOWN_QUICK_ISSUE = 3;
const QUICK_ISSUE_INCORRECT_POSITION_TEXT = 'Wrong position';
const QUICK_ISSUE_INCORRECT_ATTRIBUTE_TEXT = 'Wrong attribute';
const DEFAULT_PROJECT_SUBSETS = ['Train', 'Test', 'Validation'];
const INTEL_TERMS_OF_USE_URL = 'https://www.intel.com/content/www/us/en/legal/terms-of-use.html';
const INTEL_COOKIES_URL = 'https://www.intel.com/content/www/us/en/privacy/intel-cookie-notice.html';
const INTEL_PRIVACY_URL = 'https://www.intel.com/content/www/us/en/privacy/intel-privacy-notice.html';
const DEFAULT_AWS_S3_REGIONS: string[][] = [
    ['us-east-1', 'US East (N. Virginia)'],
    ['us-east-2', 'US East (Ohio)'],
    ['us-west-1', 'US West (N. California)'],
    ['us-west-2', 'US West (Oregon)'],
    ['ap-south-1', 'Asia Pacific (Mumbai)'],
    ['ap-northeast-1', 'Asia Pacific (Tokyo)'],
    ['ap-northeast-2', 'Asia Pacific (Seoul)'],
    ['ap-northeast-3', 'Asia Pacific (Osaka)'],
    ['ap-southeast-1', 'Asia Pacific (Singapore)'],
    ['ap-southeast-2', 'Asia Pacific (Sydney)'],
    ['ca-central-1', 'Canada (Central)'],
    ['eu-central-1', 'EU (Frankfurt)'],
    ['eu-west-1', 'Europe (Ireland)'],
    ['eu-west-2', 'Europe (London)'],
    ['eu-west-3', 'Europe (Paris)'],
    ['eu-north-1', 'Europe (Stockholm)'],
    ['sa-east-1', 'South America (São Paulo)'],
];

export default {
    UNDEFINED_ATTRIBUTE_VALUE,
    NO_BREAK_SPACE,
    CHANGELOG_URL,
    LICENSE_URL,
    GITTER_URL,
    GITTER_PUBLIC_URL,
    FORUM_URL,
    GITHUB_URL,
    GITHUB_IMAGE_URL,
    SHARE_MOUNT_GUIDE_URL,
    CANVAS_BACKGROUND_COLORS,
    NEW_LABEL_COLOR,
    NUCLIO_GUIDE,
    LATEST_COMMENTS_SHOWN_QUICK_ISSUE,
    QUICK_ISSUE_INCORRECT_POSITION_TEXT,
    QUICK_ISSUE_INCORRECT_ATTRIBUTE_TEXT,
    DEFAULT_PROJECT_SUBSETS,
    INTEL_TERMS_OF_USE_URL,
    INTEL_COOKIES_URL,
    INTEL_PRIVACY_URL,
    DEFAULT_AWS_S3_REGIONS,
};
