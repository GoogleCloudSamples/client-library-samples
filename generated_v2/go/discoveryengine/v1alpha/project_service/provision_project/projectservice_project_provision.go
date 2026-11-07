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

// [START discoveryengine_v1alpha_projectservice_provision_project]

import (
	"context"
	"fmt"
	"io"
	"os"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	"cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// provisionProject provisions a project for Vertex AI Search and Conversation.
func provisionProject(ctx context.Context, w io.Writer) error {
	projectIDOrNumber := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectIDOrNumber == "" {
		projectIDOrNumber = os.Getenv("GCP_PROJECT")
	}
	if projectIDOrNumber == "" {
		projectIDOrNumber = "example-project-id"
	}

	name := fmt.Sprintf("projects/%s", projectIDOrNumber)
	acceptDataUseTerms := true
	dataUseTermsVersion := "2022-11-23"
	if v := os.Getenv("DATA_USE_TERMS_VERSION"); v != "" {
		dataUseTermsVersion = v
	}

	client, err := discoveryengine.NewProjectClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProjectClient: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.ProvisionProjectRequest{
		Name:                name,
		AcceptDataUseTerms:  acceptDataUseTerms,
		DataUseTermsVersion: dataUseTermsVersion,
	}

	op, err := client.ProvisionProject(ctx, req)
	if err != nil {
		return fmt.Errorf("ProvisionProject: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Provisioned project: %s\n", resp.GetName())
	return nil
}

// [END discoveryengine_v1alpha_projectservice_provision_project]
