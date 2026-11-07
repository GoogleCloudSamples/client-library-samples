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

// [START retail_v2_generativequestionservice_generativequestionconfigs_batchupdate]

import (
	"context"
	"fmt"
	"io"
	"strings"

	retail "cloud.google.com/go/retail/apiv2"
	retailpb "cloud.google.com/go/retail/apiv2/retailpb"
	"google.golang.org/api/option"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// batchUpdateGenerativeQuestionConfigs updates multiple generative question configurations.
func batchUpdateGenerativeQuestionConfigs(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	var opts []option.ClientOption
	if locationID != "global" && locationID != "" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-retail.googleapis.com:443", locationID)))
	}

	client, err := retail.NewGenerativeQuestionClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewGenerativeQuestionClient: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)

	requests := []*retailpb.UpdateGenerativeQuestionConfigRequest{
		{
			GenerativeQuestionConfig: &retailpb.GenerativeQuestionConfig{
				Catalog:               parent,
				Facet:                 "brand",
				AllowedInConversation: true,
			},
			UpdateMask: &fieldmaskpb.FieldMask{
				Paths: []string{"allowed_in_conversation"},
			},
		},
	}

	req := &retailpb.BatchUpdateGenerativeQuestionConfigsRequest{
		Parent:   parent,
		Requests: requests,
	}

	resp, err := client.BatchUpdateGenerativeQuestionConfigs(ctx, req)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition && (strings.Contains(err.Error(), "Retail data use terms") || strings.Contains(err.Error(), "Cloud Retail enabled")) {
			fmt.Fprintln(w, "Cloud Retail data use terms must be accepted in the Google Cloud console.")
			return nil
		}
		return fmt.Errorf("BatchUpdateGenerativeQuestionConfigs: %w", err)
	}

	for _, config := range resp.GetGenerativeQuestionConfigs() {
		fmt.Fprintf(w, "Updated generative question config for facet: %s\n", config.GetFacet())
	}

	return nil
}

// [END retail_v2_generativequestionservice_generativequestionconfigs_batchupdate]
