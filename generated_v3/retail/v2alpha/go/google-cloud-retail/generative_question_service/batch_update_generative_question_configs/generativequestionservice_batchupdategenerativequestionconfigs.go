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

// [START retail_v2alpha_generativequestionservice_generativequestionconfigs_batchupdate]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2alpha"
	retailpb "cloud.google.com/go/retail/apiv2alpha/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// batchUpdateGenerativeQuestionConfigs updates generative question configurations for a catalog.
func batchUpdateGenerativeQuestionConfigs(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)

	questionConfig := &retailpb.GenerativeQuestionConfig{
		Catalog:               parent,
		Facet:                 "brand",
		AllowedInConversation: true,
	}

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"allowed_in_conversation"},
	}

	requests := []*retailpb.UpdateGenerativeQuestionConfigRequest{
		{
			GenerativeQuestionConfig: questionConfig,
			UpdateMask:               updateMask,
		},
	}

	client, err := retail.NewGenerativeQuestionClient(ctx)
	if err != nil {
		return fmt.Errorf("NewGenerativeQuestionClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.BatchUpdateGenerativeQuestionConfigsRequest{
		Parent:   parent,
		Requests: requests,
	}

	resp, err := client.BatchUpdateGenerativeQuestionConfigs(ctx, req)
	if err != nil {
		// Handle environment precondition where Retail terms must be accepted in the Google Cloud console.
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "BatchUpdateGenerativeQuestionConfigs precondition not met: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("BatchUpdateGenerativeQuestionConfigs failed: %w", err)
	}

	fmt.Fprintf(w, "Batch updated %d generative question configuration(s):\n", len(resp.GetGenerativeQuestionConfigs()))
	for _, config := range resp.GetGenerativeQuestionConfigs() {
		fmt.Fprintf(w, "Facet: %s, Allowed in conversation: %t\n", config.GetFacet(), config.GetAllowedInConversation())
	}

	return nil
}

// [END retail_v2alpha_generativequestionservice_generativequestionconfigs_batchupdate]
