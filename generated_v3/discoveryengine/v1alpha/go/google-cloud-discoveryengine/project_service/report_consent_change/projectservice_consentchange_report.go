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

// [START discoveryengine_v1alpha_projectservice_report_consent_change]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1alpha"
	"cloud.google.com/go/discoveryengine/apiv1alpha/discoveryenginepb"
)

// reportConsentChange reports a consent change for the project service terms.
func reportConsentChange(ctx context.Context, w io.Writer, projectID string, serviceTermID string) error {
	serviceTermVersion := "2022-11-23"
	project := fmt.Sprintf("projects/%s", projectID)
	consentChangeAction := discoveryenginepb.ReportConsentChangeRequest_ACCEPT

	client, err := discoveryengine.NewProjectClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProjectClient: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.ReportConsentChangeRequest{
		ConsentChangeAction: consentChangeAction,
		Project:             project,
		ServiceTermId:       serviceTermID,
		ServiceTermVersion:  serviceTermVersion,
	}

	resp, err := client.ReportConsentChange(ctx, req)
	if err != nil {
		return fmt.Errorf("ReportConsentChange: %w", err)
	}

	fmt.Fprintf(w, "Reported consent change for project: %s\n", resp.GetName())
	return nil
}

// [END discoveryengine_v1alpha_projectservice_report_consent_change]
