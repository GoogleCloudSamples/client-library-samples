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

// [START recommender_v1_recommender_recommenderconfig_update]

import (
	"context"
	"fmt"
	"io"

	recommender "cloud.google.com/go/recommender/apiv1"
	"cloud.google.com/go/recommender/apiv1/recommenderpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateRecommenderConfig updates a recommender configuration.
func updateRecommenderConfig(ctx context.Context, w io.Writer, projectID string, locationID string, recommenderID string) error {
	// Recommenders such as MachineTypeRecommender require a zonal scope instead of global.
	if locationID == "global" {
		locationID = "us-central1-a"
	}

	client, err := recommender.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("recommender.NewClient: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s/locations/%s/recommenders/%s/config", projectID, locationID, recommenderID)

	// Fetch current config to obtain its Etag for optimistic concurrency control.
	currentConfig, err := client.GetRecommenderConfig(ctx, &recommenderpb.GetRecommenderConfigRequest{
		Name: name,
	})
	if err != nil {
		return fmt.Errorf("client.GetRecommenderConfig: %w", err)
	}

	recommenderConfig := &recommenderpb.RecommenderConfig{
		Name:        name,
		DisplayName: "Updated Recommender Config",
		Etag:        currentConfig.GetEtag(),
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	req := &recommenderpb.UpdateRecommenderConfigRequest{
		RecommenderConfig: recommenderConfig,
		UpdateMask:        updateMask,
	}

	resp, err := client.UpdateRecommenderConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateRecommenderConfig: %w", err)
	}

	fmt.Fprintf(w, "Updated recommender config: %s\n", resp.GetName())

	return nil
}

// [END recommender_v1_recommender_recommenderconfig_update]
