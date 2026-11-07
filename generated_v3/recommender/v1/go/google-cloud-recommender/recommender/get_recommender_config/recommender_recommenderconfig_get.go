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

// [START recommender_v1_recommender_recommenderconfig_get]

import (
	"context"
	"fmt"
	"io"

	recommender "cloud.google.com/go/recommender/apiv1beta1"
	"cloud.google.com/go/recommender/apiv1beta1/recommenderpb"
)

// getRecommenderConfig retrieves the configuration for a recommender.
func getRecommenderConfig(ctx context.Context, w io.Writer, locationID string, recommenderID string, projectID string) error {
	// Recommenders such as MachineTypeRecommender require zone scope rather than global scope.
	if locationID == "" || locationID == "global" {
		locationID = "us-central1-a"
	}

	name := fmt.Sprintf("projects/%s/locations/%s/recommenders/%s/config", projectID, locationID, recommenderID)

	client, err := recommender.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &recommenderpb.GetRecommenderConfigRequest{
		Name: name,
	}

	resp, err := client.GetRecommenderConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("GetRecommenderConfig: %w", err)
	}

	fmt.Fprintf(w, "Recommender config: %s\n", resp.GetName())

	return nil
}

// [END recommender_v1_recommender_recommenderconfig_get]
