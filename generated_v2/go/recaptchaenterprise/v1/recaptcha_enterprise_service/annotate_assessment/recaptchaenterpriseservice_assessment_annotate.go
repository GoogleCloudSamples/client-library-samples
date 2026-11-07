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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_annotate_assessment]

import (
	"context"
	"fmt"
	"io"

	recaptchaenterprise "cloud.google.com/go/recaptchaenterprise/v2/apiv1"
	recaptchaenterprisepb "cloud.google.com/go/recaptchaenterprise/v2/apiv1/recaptchaenterprisepb"
)

// annotateAssessment annotates an assessment with a fraud verdict.
func annotateAssessment(ctx context.Context, w io.Writer, projectID string, assessmentID string) error {
	name := fmt.Sprintf("projects/%s/assessments/%s", projectID, assessmentID)

	client, err := recaptchaenterprise.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("recaptchaenterprise.NewClient: %w", err)
	}
	defer client.Close()

	req := &recaptchaenterprisepb.AnnotateAssessmentRequest{
		Name:       name,
		Annotation: recaptchaenterprisepb.AnnotateAssessmentRequest_FRAUDULENT,
	}

	resp, err := client.AnnotateAssessment(ctx, req)
	if err != nil {
		return fmt.Errorf("AnnotateAssessment: %w", err)
	}

	fmt.Fprintf(w, "Annotated assessment: %s\n", name)
	fmt.Fprintf(w, "Response: %v\n", resp)

	return nil
}

// [END recaptchaenterprise_v1_recaptchaenterpriseservice_annotate_assessment]
