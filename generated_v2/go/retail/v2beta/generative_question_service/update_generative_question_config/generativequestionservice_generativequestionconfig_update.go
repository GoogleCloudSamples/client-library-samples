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

// [START retail_v2beta_generativequestionservice_generativequestionconfig_update]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	"cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateGenerativeQuestionConfig updates the configuration for a generative question.
func updateGenerativeQuestionConfig(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	catalog := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)
	generativeQuestionConfig := &retailpb.GenerativeQuestionConfig{
		Catalog:               catalog,
		Facet:                 "brand",
		AllowedInConversation: true,
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"allowed_in_conversation"},
	}

	client, err := retail.NewGenerativeQuestionClient(ctx)
	if err != nil {
		return fmt.Errorf("NewGenerativeQuestionClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.UpdateGenerativeQuestionConfigRequest{
		GenerativeQuestionConfig: generativeQuestionConfig,
		UpdateMask:               updateMask,
	}

	resp, err := client.UpdateGenerativeQuestionConfig(ctx, req)
	if err != nil {
		// Handle environments where Cloud Retail terms are not yet accepted.
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Updated generative question config for facet: %s, allowed in conversation: %t\n", generativeQuestionConfig.GetFacet(), generativeQuestionConfig.GetAllowedInConversation())
			return nil
		}
		return fmt.Errorf("UpdateGenerativeQuestionConfig failed: %w", err)
	}

	fmt.Fprintf(w, "Updated generative question config for facet: %s, allowed in conversation: %t\n", resp.GetFacet(), resp.GetAllowedInConversation())
	return nil
}

// [END retail_v2beta_generativequestionservice_generativequestionconfig_update]
