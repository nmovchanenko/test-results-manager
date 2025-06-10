const e = {
    "spec": {
        "id": 275,
        "createdAt": "2025-02-05T12:08:13.841Z",
        "updatedAt": "2025-02-05T12:08:13.841Z",
        "key": "C4001",
        "file": "rn-monolith/ui/admin.edit.applicationV2.singletenant.spec.ts",
        "title": "<C4001> Validate Application functionality works correctly on single tenant application for V2 Rate Filing State Building @monolith-nightly-group-2",
        "tags": [
            "monolith-nightly-group-2"
        ],
        "annotations": []
    },
    "executions": [
        {
            "execution": {
                "id": 34,
                "createdAt": "2025-02-05T12:08:13.830Z",
                "updatedAt": "2025-02-05T12:08:13.830Z",
                "type": "nightly",
                "name": "monolith-nightly-group-2-run-01-02-2025-06:17:45",
                "environment": "staging",
                "version": "1.49.1",
                "startedAt": "2025-02-01T06:17:59.160Z"
            },
            "results": [
                {
                    "id": 2090,
                    "createdAt": "2025-02-05T12:08:13.844Z",
                    "updatedAt": "2025-02-05T12:08:13.844Z",
                    "allureLink": "no link",
                    "retry": 0,
                    "status": "failed",
                    "duration": 97207,
                    "startTime": "2025-02-01T06:18:30.047Z",
                    "specId": 275,
                    "executionId": 34,
                    "errors": [
                        {
                            "id": 235,
                            "createdAt": "2025-02-05T12:08:13.843Z",
                            "updatedAt": "2025-02-05T12:08:13.844Z",
                            "type": "TimeoutError",
                            "message": "locator.waitFor: Timeout 20000ms exceeded.",
                            "callLog": [
                                "Call log:",
                                "  - waiting for locator('xpath=(//img[@class=\"tab-complete-image signature-image\"])').nth(1) to be visible",
                                "    44 × locator resolved to hidden <img alt=\"\" draggable=\"false\" class=\"tab-complete-image signature-image\" src=\"https://apps-d.docusign.com/api/esign/demo/Signing/image.aspx?ti=6ad9fe79011542059b39e0e43ce0f530&i=d2045658-6c57-46e1-bc4b-e0471813a92b\"/>"
                            ],
                            "callStack": [
                                "at DocusignReviewPage.clickOnFinishButton (/function/pages/external/review.docusign.page.ts:64:19)",
                                "at DocusignReviewPage.reviewAndSignDocuments (/function/pages/external/review.docusign.page.ts:80:5)",
                                "at DocusignRenterSteps.renterReviewAndSignDocuments (/function/steps/docusign/renter.docusign.steps.ts:21:5)",
                                "at /function/tests/rnmonolith/ui/admin.edit.applicationV2.singletenant.spec.ts:103:5"
                            ],
                            "testAssertion": " ",
                            "expectedPattern": " ",
                            "receivedString": " ",
                            "location": "/function/pages/external/review.docusign.page.ts:64",
                            "resultId": 2090,
                            "assumptions": []
                        }
                    ]
                },
                {
                    "id": 2091,
                    "createdAt": "2025-02-05T12:08:13.845Z",
                    "updatedAt": "2025-02-05T12:08:13.845Z",
                    "allureLink": "no link",
                    "retry": 1,
                    "status": "failed",
                    "duration": 65392,
                    "startTime": "2025-02-01T06:21:16.593Z",
                    "specId": 275,
                    "executionId": 34,
                    "errors": [
                        {
                            "id": 236,
                            "createdAt": "2025-02-05T12:08:13.845Z",
                            "updatedAt": "2025-02-05T12:08:13.845Z",
                            "type": "TimeoutError",
                            "message": "locator.waitFor: Timeout 20000ms exceeded.",
                            "callLog": [
                                "Call log:",
                                "  - waiting for getByText(/signatures for deal have been requested/i) to be visible"
                            ],
                            "callStack": [
                                "at MonoAdminEditApplicationPage.clickRequestSignaturesButton (/function/pages/monolith/admin/editapplication.admin.ml.page.ts:221:48)",
                                "at /function/tests/rnmonolith/ui/admin.edit.applicationV2.singletenant.spec.ts:102:5"
                            ],
                            "testAssertion": " ",
                            "expectedPattern": " ",
                            "receivedString": " ",
                            "location": "/function/pages/monolith/admin/editapplication.admin.ml.page.ts:221",
                            "resultId": 2091,
                            "assumptions": []
                        }
                    ]
                }
            ]
        }
    ]
};