// result example
const e = {
    "id": 2530,
    "createdAt": "2025-02-08T15:43:18.488Z",
    "updatedAt": "2025-02-08T15:43:18.488Z",
    "allureLink": "https://automation.qa.staging.theguarantors.com/monolith-nightly-group-2-run-08-02-2025-06:17:54/allure-report/index.html#suites/4e6d2917415141d522e594195775e533/22de16a338b5bdbe/",
    "retry": 0,
    "status": "failed",
    "duration": 125136,
    "startTime": "2025-02-08T06:18:20.845Z",
    "specId": 276,
    "executionId": 54,
    "spec": {
        "id": 276,
        "createdAt": "2025-02-05T12:08:13.848Z",
        "updatedAt": "2025-02-05T12:08:13.848Z",
        "key": "C4003",
        "file": "rn-monolith/ui/admin.edit.applicationV2.cotenants.spec.ts",
        "title": "<C4003> Admin validate application functionality works correctly on co-tenants applications for V2 Rate Filing State Building @monolith-nightly-group-2",
        "tags": [
            "monolith-nightly-group-2"
        ],
        "annotations": []
    },
    "execution": {
        "id": 54,
        "createdAt": "2025-02-08T15:43:18.458Z",
        "updatedAt": "2025-02-08T15:43:18.458Z",
        "type": "nightly",
        "name": "monolith-nightly-group-2-run-08-02-2025-06:17:54",
        "environment": "staging",
        "version": "1.49.1",
        "startedAt": "2025-02-08T06:18:12.285Z"
    },
    "errors": [
        {
            "id": 406,
            "createdAt": "2025-02-08T15:43:18.484Z",
            "updatedAt": "2025-02-08T15:43:18.488Z",
            "type": "Error",
            "message": "corporate checkbox should be checked on main renter page",
            "callLog": [
                "Timed out 5000ms waiting for expect(locator).toBeChecked()",
                "Locator: locator('#isCorporateRate')",
                "Expected: checked",
                "Received: unchecked",
                "Call log:",
                "  - corporate checkbox should be checked on main renter page with timeout 5000ms",
                "  - waiting for locator('#isCorporateRate')",
                "    9 × locator resolved to <input value=\"true\" type=\"checkbox\" id=\"isCorporateRate\" name=\"isCorporateRate\"/>",
                "      - unexpected value \"unchecked\""
            ],
            "callStack": [
                "at /function/tests/rnmonolith/ui/admin.edit.applicationV2.cotenants.spec.ts:168:8"
            ],
            "testAssertion": "Timed out 5000ms waiting for expect(locator).toBeChecked()",
            "expectedPattern": " ",
            "receivedString": " ",
            "location": "/function/tests/rn-monolith/ui/admin.edit.applicationV2.cotenants.spec.ts:168",
            "resultId": 2530,
            "assumptions": [
                {
                    "id": 28,
                    "createdAt": "2025-02-08T15:49:38.116Z",
                    "updatedAt": "2025-02-08T15:49:38.116Z",
                    "isConfirmed": true,
                    "score": 1,
                    "madeBy": "user",
                    "issueId": 66,
                    "resultErrorId": 406,
                    "issue": {
                        "id": 66,
                        "createdAt": "2025-02-08T15:49:38.103Z",
                        "updatedAt": "2025-02-08T15:49:38.103Z",
                        "name": "checkbox 'corporate' state not saved",
                        "category": "Bug",
                        "description": "admin update application and check Corporate then save",
                        "portal": "",
                        "service": "",
                        "ticket": ""
                    }
                }
            ]
        }
    ]
};

const modelStruct = {
    "errors": [
        {
            "id": 406,
            "createdAt": "2025-02-08T15:43:18.484Z",
            "updatedAt": "2025-02-08T15:43:18.488Z",
            "type": "Error",
            "message": "corporate checkbox should be checked on main renter page",
            "callLog": [
                "Timed out 5000ms waiting for expect(locator).toBeChecked()",
                "Locator: locator('#isCorporateRate')",
                "Expected: checked",
                "Received: unchecked",
                "Call log:",
                "  - corporate checkbox should be checked on main renter page with timeout 5000ms",
                "  - waiting for locator('#isCorporateRate')",
                "    9 × locator resolved to <input value=\"true\" type=\"checkbox\" id=\"isCorporateRate\" name=\"isCorporateRate\"/>",
                "      - unexpected value \"unchecked\""
            ],
            "callStack": [
                "at /function/tests/rnmonolith/ui/admin.edit.applicationV2.cotenants.spec.ts:168:8"
            ],
            "testAssertion": "Timed out 5000ms waiting for expect(locator).toBeChecked()",
            "expectedPattern": " ",
            "receivedString": " ",
            "location": "/function/tests/rn-monolith/ui/admin.edit.applicationV2.cotenants.spec.ts:168",
            "resultId": 2530
        }
    ],
    "assumptions": [
        {
            "id": 28,
            "createdAt": "2025-02-08T15:49:38.116Z",
            "updatedAt": "2025-02-08T15:49:38.116Z",
            "isConfirmed": true,
            "score": 1,
            "madeBy": "user",
            "issueId": 66,
            "resultErrorId": 406,
            "issue": {
                "id": 66,
                "createdAt": "2025-02-08T15:49:38.103Z",
                "updatedAt": "2025-02-08T15:49:38.103Z",
                "name": "checkbox 'corporate' state not saved",
                "category": "Bug",
                "description": "admin update application and check Corporate then save",
                "portal": "",
                "service": "",
                "ticket": ""
            }
        }
    ],
    "result": {
        "id": 2530,
        "createdAt": "2025-02-08T15:43:18.488Z",
        "updatedAt": "2025-02-08T15:43:18.488Z",
        "allureLink": "https://automation.qa.staging.theguarantors.com/monolith-nightly-group-2-run-08-02-2025-06:17:54/allure-report/index.html#suites/4e6d2917415141d522e594195775e533/22de16a338b5bdbe/",
        "retry": 0,
        "status": "failed",
        "duration": 125136,
        "startTime": "2025-02-08T06:18:20.845Z",
        "specId": 276,
        "executionId": 54,
        "isSelected": false
    },
    "spec": {
        "id": 276,
        "createdAt": "2025-02-05T12:08:13.848Z",
        "updatedAt": "2025-02-05T12:08:13.848Z",
        "key": "C4003",
        "file": "rn-monolith/ui/admin.edit.applicationV2.cotenants.spec.ts",
        "title": "<C4003> Admin validate application functionality works correctly on co-tenants applications for V2 Rate Filing State Building @monolith-nightly-group-2",
        "tags": [
            "monolith-nightly-group-2"
        ],
        "annotations": []
    },
    "execution": {
        "id": 54,
        "createdAt": "2025-02-08T15:43:18.458Z",
        "updatedAt": "2025-02-08T15:43:18.458Z",
        "type": "nightly",
        "name": "monolith-nightly-group-2-run-08-02-2025-06:17:54",
        "environment": "staging",
        "version": "1.49.1",
        "startedAt": "2025-02-08T06:18:12.285Z"
    }
}

// group example for SpecSection
const e2 = [
    {
        "spec": {
            "id": 306,
            "createdAt": "2025-02-05T12:08:13.942Z",
            "updatedAt": "2025-02-05T12:08:13.942Z",
            "key": "C4027",
            "file": "rn-monolith/ui/submit.using.vouch.spec.ts",
            "title": "<C4027> Vouch premium enabled and renter submit for free @monolith-nightly-group-4",
            "tags": [
                "monolith-nightly-group-4"
            ],
            "annotations": []
        },
        "executions": {
            "48": {
                "execution": {
                    "id": 48,
                    "createdAt": "2025-02-05T12:11:36.390Z",
                    "updatedAt": "2025-02-05T12:11:36.390Z",
                    "type": "nightly",
                    "name": "monolith-nightly-group-4-run-05-02-2025-06:37:57",
                    "environment": "staging",
                    "version": "1.49.1",
                    "startedAt": "2025-02-05T06:38:15.794Z"
                },
                "results": [
                    {
                        "id": 2401,
                        "createdAt": "2025-02-05T12:11:36.404Z",
                        "updatedAt": "2025-02-05T12:11:36.404Z",
                        "allureLink": "no link",
                        "retry": 0,
                        "status": "passed",
                        "duration": 153509,
                        "startTime": "2025-02-05T06:38:46.031Z",
                        "specId": 306,
                        "executionId": 48,
                        "errors": []
                    }
                ]
            },
            "56": {
                "execution": {
                    "id": 56,
                    "createdAt": "2025-02-08T16:06:42.442Z",
                    "updatedAt": "2025-02-08T16:06:42.442Z",
                    "type": "nightly",
                    "name": "monolith-nightly-group-4-run-08-02-2025-06:36:32",
                    "environment": "staging",
                    "version": "1.49.1",
                    "startedAt": "2025-02-08T06:36:47.195Z"
                },
                "results": [
                    {
                        "id": 2571,
                        "createdAt": "2025-02-08T16:06:42.471Z",
                        "updatedAt": "2025-02-08T16:06:42.471Z",
                        "allureLink": "https://automation.qa.staging.theguarantors.com/monolith-nightly-group-4-run-08-02-2025-06:36:32/allure-report/index.html#suites/5603d0022ad3eb908cb1551a6588a193/502514c6f9ccd6c/",
                        "retry": 0,
                        "status": "failed",
                        "duration": 151330,
                        "startTime": "2025-02-08T06:37:21.279Z",
                        "specId": 306,
                        "executionId": 56,
                        "errors": [
                            {
                                "id": 422,
                                "createdAt": "2025-02-08T16:06:42.470Z",
                                "updatedAt": "2025-02-08T16:06:42.471Z",
                                "type": "TimeoutError",
                                "message": "locator.waitFor: Timeout 30000ms exceeded.",
                                "callLog": [
                                    "Call log:",
                                    "  - waiting for locator('button').filter({ hasText: 'Go to Checkout' }) to be visible"
                                ],
                                "callStack": [
                                    "at /function/pages/msa/renter/coveragesummary.renter.msa.page.ts:33:37",
                                    "at MsaRenterCoverageSummaryPage.goToCheckout (/function/pages/msa/renter/coveragesummary.renter.msa.page.ts:31:16)",
                                    "at /function/tests/rnmonolith/ui/submit.using.vouch.spec.ts:32:42"
                                ],
                                "testAssertion": " ",
                                "expectedPattern": " ",
                                "receivedString": " ",
                                "location": "/function/pages/msa/renter/coveragesummary.renter.msa.page.ts:33",
                                "resultId": 2571,
                                "assumptions": []
                            }
                        ]
                    },
                    {
                        "id": 2572,
                        "createdAt": "2025-02-08T16:06:42.472Z",
                        "updatedAt": "2025-02-08T16:06:42.472Z",
                        "allureLink": "https://automation.qa.staging.theguarantors.com/monolith-nightly-group-4-run-08-02-2025-06:36:32/allure-report/index.html#suites/5603d0022ad3eb908cb1551a6588a193/502514c6f9ccd6c/retries",
                        "retry": 1,
                        "status": "passed",
                        "duration": 165242,
                        "startTime": "2025-02-08T06:40:00.340Z",
                        "specId": 306,
                        "executionId": 56,
                        "errors": []
                    }
                ]
            },
            "64": {
                "execution": {
                    "id": 64,
                    "createdAt": "2025-02-10T10:08:29.866Z",
                    "updatedAt": "2025-02-10T10:08:29.866Z",
                    "type": "nightly",
                    "name": "monolith-nightly-group-4-run-09-02-2025-06:36:59",
                    "environment": "staging",
                    "version": "1.49.1",
                    "startedAt": "2025-02-09T06:37:10.517Z"
                },
                "results": [
                    {
                        "id": 2733,
                        "createdAt": "2025-02-10T10:08:29.887Z",
                        "updatedAt": "2025-02-10T10:08:29.887Z",
                        "allureLink": "https://automation.qa.staging.theguarantors.com/monolith-nightly-group-4-run-09-02-2025-06:36:59/allure-report/index.html#suites/5603d0022ad3eb908cb1551a6588a193/ca2349c6d17eb070/",
                        "retry": 0,
                        "status": "passed",
                        "duration": 161593,
                        "startTime": "2025-02-09T06:37:47.863Z",
                        "specId": 306,
                        "executionId": 64,
                        "errors": []
                    }
                ]
            },
            "69": {
                "execution": {
                    "id": 69,
                    "createdAt": "2025-02-10T10:08:36.605Z",
                    "updatedAt": "2025-02-10T10:08:36.605Z",
                    "type": "nightly",
                    "name": "monolith-nightly-group-4-run-10-02-2025-06:38:45",
                    "environment": "staging",
                    "version": "1.49.1",
                    "startedAt": "2025-02-10T06:38:59.357Z"
                },
                "results": [
                    {
                        "id": 2844,
                        "createdAt": "2025-02-10T10:08:36.628Z",
                        "updatedAt": "2025-02-10T10:08:36.628Z",
                        "allureLink": "https://automation.qa.staging.theguarantors.com/monolith-nightly-group-4-run-10-02-2025-06:38:45/allure-report/index.html#suites/5603d0022ad3eb908cb1551a6588a193/b1d8a8423a7bbc4/",
                        "retry": 0,
                        "status": "failed",
                        "duration": 158585,
                        "startTime": "2025-02-10T06:39:12.830Z",
                        "specId": 306,
                        "executionId": 69,
                        "errors": [
                            {
                                "id": 531,
                                "createdAt": "2025-02-10T10:08:36.627Z",
                                "updatedAt": "2025-02-10T10:08:36.628Z",
                                "type": "TimeoutError",
                                "message": "locator.waitFor: Timeout 30000ms exceeded.",
                                "callLog": [
                                    "Call log:",
                                    "  - waiting for locator('button').filter({ hasText: 'Go to Checkout' }) to be visible"
                                ],
                                "callStack": [
                                    "at /function/pages/msa/renter/coveragesummary.renter.msa.page.ts:33:37",
                                    "at MsaRenterCoverageSummaryPage.goToCheckout (/function/pages/msa/renter/coveragesummary.renter.msa.page.ts:31:16)",
                                    "at /function/tests/rnmonolith/ui/submit.using.vouch.spec.ts:32:42"
                                ],
                                "testAssertion": " ",
                                "expectedPattern": " ",
                                "receivedString": " ",
                                "location": "/function/pages/msa/renter/coveragesummary.renter.msa.page.ts:33",
                                "resultId": 2844,
                                "assumptions": []
                            }
                        ]
                    },
                    {
                        "id": 2845,
                        "createdAt": "2025-02-10T10:08:36.629Z",
                        "updatedAt": "2025-02-10T10:08:36.629Z",
                        "allureLink": "https://automation.qa.staging.theguarantors.com/monolith-nightly-group-4-run-10-02-2025-06:38:45/allure-report/index.html#suites/5603d0022ad3eb908cb1551a6588a193/b1d8a8423a7bbc4/retries",
                        "retry": 1,
                        "status": "passed",
                        "duration": 192364,
                        "startTime": "2025-02-10T06:42:00.038Z",
                        "specId": 306,
                        "executionId": 69,
                        "errors": []
                    }
                ]
            },
            "80": {
                "execution": {
                    "id": 80,
                    "createdAt": "2025-02-11T09:20:38.919Z",
                    "updatedAt": "2025-02-11T09:20:38.919Z",
                    "type": "nightly",
                    "name": "monolith-nightly-group-4-run-11-02-2025-06:38:15",
                    "environment": "staging",
                    "version": "1.49.1",
                    "startedAt": "2025-02-11T06:38:27.496Z"
                },
                "results": [
                    {
                        "id": 3073,
                        "createdAt": "2025-02-11T09:20:38.960Z",
                        "updatedAt": "2025-02-11T09:20:38.960Z",
                        "allureLink": "https://automation.qa.staging.theguarantors.com/monolith-nightly-group-4-run-11-02-2025-06:38:15/allure-report/index.html#suites/5603d0022ad3eb908cb1551a6588a193/62a66df9c63487f2/",
                        "retry": 0,
                        "status": "failed",
                        "duration": 186072,
                        "startTime": "2025-02-11T06:38:58.674Z",
                        "specId": 306,
                        "executionId": 80,
                        "errors": [
                            {
                                "id": 645,
                                "createdAt": "2025-02-11T09:20:38.959Z",
                                "updatedAt": "2025-02-11T09:20:38.960Z",
                                "type": "Error",
                                "message": "Email not found: has purchased a policy for",
                                "callLog": [],
                                "callStack": [
                                    "at EmailClient.getEmailAttempt (/function/email/client.ts:203:15)",
                                    "at EmailClient.getEmailRetryOnFailure (/function/email/client.ts:186:22)",
                                    "at EmailClient.getLatestEmail (/function/email/client.ts:109:22)",
                                    "at Object.getLandlordNotifyPurchaseContent (/function/base/services/email.content.ts:188:20)",
                                    "at /function/tests/rnmonolith/ui/submit.using.vouch.spec.ts:50:40"
                                ],
                                "testAssertion": " ",
                                "expectedPattern": " ",
                                "receivedString": " ",
                                "location": "/function/email/client.ts:203",
                                "resultId": 3073,
                                "assumptions": []
                            }
                        ]
                    },
                    {
                        "id": 3074,
                        "createdAt": "2025-02-11T09:20:38.962Z",
                        "updatedAt": "2025-02-11T09:20:38.962Z",
                        "allureLink": "https://automation.qa.staging.theguarantors.com/monolith-nightly-group-4-run-11-02-2025-06:38:15/allure-report/index.html#suites/5603d0022ad3eb908cb1551a6588a193/62a66df9c63487f2/retries",
                        "retry": 1,
                        "status": "failed",
                        "duration": 181201,
                        "startTime": "2025-02-11T06:42:12.138Z",
                        "specId": 306,
                        "executionId": 80,
                        "errors": [
                            {
                                "id": 646,
                                "createdAt": "2025-02-11T09:20:38.961Z",
                                "updatedAt": "2025-02-11T09:20:38.962Z",
                                "type": "Error",
                                "message": "Email not found: has purchased a policy for",
                                "callLog": [],
                                "callStack": [
                                    "at EmailClient.getEmailAttempt (/function/email/client.ts:203:15)",
                                    "at EmailClient.getEmailRetryOnFailure (/function/email/client.ts:186:22)",
                                    "at EmailClient.getLatestEmail (/function/email/client.ts:109:22)",
                                    "at Object.getLandlordNotifyPurchaseContent (/function/base/services/email.content.ts:188:20)",
                                    "at /function/tests/rnmonolith/ui/submit.using.vouch.spec.ts:50:40"
                                ],
                                "testAssertion": " ",
                                "expectedPattern": " ",
                                "receivedString": " ",
                                "location": "/function/email/client.ts:203",
                                "resultId": 3074,
                                "assumptions": []
                            }
                        ]
                    },
                    {
                        "id": 3075,
                        "createdAt": "2025-02-11T09:20:38.963Z",
                        "updatedAt": "2025-02-11T09:20:38.963Z",
                        "allureLink": "https://automation.qa.staging.theguarantors.com/monolith-nightly-group-4-run-11-02-2025-06:38:15/allure-report/index.html#suites/5603d0022ad3eb908cb1551a6588a193/62a66df9c63487f2/retries",
                        "retry": 2,
                        "status": "failed",
                        "duration": 207464,
                        "startTime": "2025-02-11T06:45:20.851Z",
                        "specId": 306,
                        "executionId": 80,
                        "errors": [
                            {
                                "id": 647,
                                "createdAt": "2025-02-11T09:20:38.963Z",
                                "updatedAt": "2025-02-11T09:20:38.963Z",
                                "type": "Error",
                                "message": "Email not found: has purchased a policy for",
                                "callLog": [],
                                "callStack": [
                                    "at EmailClient.getEmailAttempt (/function/email/client.ts:203:15)",
                                    "at EmailClient.getEmailRetryOnFailure (/function/email/client.ts:186:22)",
                                    "at EmailClient.getLatestEmail (/function/email/client.ts:109:22)",
                                    "at Object.getLandlordNotifyPurchaseContent (/function/base/services/email.content.ts:188:20)",
                                    "at /function/tests/rnmonolith/ui/submit.using.vouch.spec.ts:50:40"
                                ],
                                "testAssertion": " ",
                                "expectedPattern": " ",
                                "receivedString": " ",
                                "location": "/function/email/client.ts:203",
                                "resultId": 3075,
                                "assumptions": []
                            }
                        ]
                    }
                ]
            }
        }
    }
];



// https://app.datadoghq.com/apm/traces?query=env%3Astaging&agg_m=count&agg_m_source=base&agg_t=count&cols=core_service%2Ccore_resource_name%2Clog_duration%2Clog_http.method%2Clog_http.status_code&fromUser=false&historicalData=true&messageDisplay=inline&query_translation_version=v0&sort=desc&sort_by=time&sort_order=asc&spanType=all&storage=hot&view=spans&start=1739875014426&end=1739875236439&paused=true
// ?query=env%3Astaging&agg_m=count&agg_m_source=base&agg_t=count&cols=core_service%2Ccore_resource_name%2Clog_duration%2Clog_http.method%2Clog_http.status_code&fromUser=false&historicalData=true&messageDisplay=inline&query_translation_version=v0&sort=desc&sort_by=time&sort_order=asc&spanType=all&storage=hot&view=spans&start=1739875014426&end=1739875236439&paused=true

console.log(new URL('https://app.datadoghq.com/apm/traces?query=env%3Astaging&agg_m=count&agg_m_source=base&agg_t=count&cols=core_service%2Ccore_resource_name%2Clog_duration%2Clog_http.method%2Clog_http.status_code&fromUser=false&historicalData=true&messageDisplay=inline&query_translation_version=v0&sort=desc&sort_by=time&sort_order=asc&spanType=all&storage=hot&view=spans&start=1739875014426&end=1739875236439&paused=true').searchParams);