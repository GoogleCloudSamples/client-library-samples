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

// [START discoveryengine_v1beta_projectservice_provision_project]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// provisionProject provisions a project for Vertex AI Search and Conversation.
func provisionProject(ctx context.Context, w io.Writer, projectID string) error {
	acceptDataUseTerms := true
	dataUseTermsVersion := "2022-11-23"
	name := fmt.Sprintf("projects/%s", projectID)

	client, err := discoveryengine.NewProjectClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProjectClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.ProvisionProjectRequest{
		Name:                name,
		AcceptDataUseTerms:  acceptDataUseTerms,
		DataUseTermsVersion: dataUseTermsVersion,
	}

	op, err := client.ProvisionProject(ctx, req)
	if err != nil {
		return fmt.Errorf("ProvisionProject failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Provisioned project: %s\n", resp.GetName())

	return nil
}

// [END discoveryengine_v1beta_projectservice_provision_project]
