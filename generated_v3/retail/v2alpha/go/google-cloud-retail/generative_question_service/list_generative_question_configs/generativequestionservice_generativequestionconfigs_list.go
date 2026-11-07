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

// [START retail_v2alpha_generativequestionservice_generativequestionconfigs_list]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// listGenerativeQuestionConfigs lists generative question configurations for a catalog.
func listGenerativeQuestionConfigs(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)

	client, err := retail.NewGenerativeQuestionClient(ctx)
	if err != nil {
		return fmt.Errorf("NewGenerativeQuestionClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.ListGenerativeQuestionConfigsRequest{
		Parent: parent,
	}

	resp, err := client.ListGenerativeQuestionConfigs(ctx, req)
	if err != nil {
		// Sandboxes and projects that have not accepted Retail data use terms return FailedPrecondition.
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintln(w, "Cloud Retail is not enabled or data terms not accepted.")
			return nil
		}
		return fmt.Errorf("ListGenerativeQuestionConfigs: %w", err)
	}

	fmt.Fprintf(w, "Found %d generative question configurations.\n", len(resp.GetGenerativeQuestionConfigs()))
	for _, config := range resp.GetGenerativeQuestionConfigs() {
		fmt.Fprintf(w, "Facet: %s, Question: %s\n", config.GetFacet(), config.GetFinalQuestion())
	}

	return nil
}

// [END retail_v2alpha_generativequestionservice_generativequestionconfigs_list]
