// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START webrisk_v1_webriskservice_submission_create]

import (
	"context"
	"fmt"
	"io"

	webrisk "cloud.google.com/go/webrisk/apiv1"
	webriskpb "cloud.google.com/go/webrisk/apiv1/webriskpb"
)

// createSubmission submits a suspected malicious URI to Web Risk.
func createSubmission(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	submission := &webriskpb.Submission{
		Uri: "http://testsafebrowsing.appspot.com/s/phishing.html",
	}

	client, err := webrisk.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &webriskpb.CreateSubmissionRequest{
		Parent:     parent,
		Submission: submission,
	}

	resp, err := client.CreateSubmission(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateSubmission: %w", err)
	}

	fmt.Fprintf(w, "Submission created for URI: %s\n", resp.GetUri())
	return nil
}

// [END webrisk_v1_webriskservice_submission_create]
