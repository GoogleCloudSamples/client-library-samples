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

// [START recommender_v1_recommender_recommendations_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	recommender "cloud.google.com/go/recommender/apiv1beta1"
	"cloud.google.com/go/recommender/apiv1beta1/recommenderpb"
	"google.golang.org/api/iterator"
)

// listRecommendations retrieves recommendations for a specified resource.
func listRecommendations(ctx context.Context, w io.Writer, locationID string, recommenderID string) error {
	projectNumber := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectNumber == "" {
		projectNumber = os.Getenv("PROJECT_ID")
	}
	if projectNumber == "" {
		projectNumber = "example-project-number"
	}

	parent := fmt.Sprintf("projects/%s/locations/%s/recommenders/%s", projectNumber, locationID, recommenderID)

	client, err := recommender.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &recommenderpb.ListRecommendationsRequest{
		Parent: parent,
	}

	it := client.ListRecommendations(ctx, req)
	count := 0
	for {
		recommendation, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate recommendations: %w", err)
		}
		fmt.Fprintf(w, "Recommendation: %s\n", recommendation.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No recommendations found.")
	}

	return nil
}

// [END recommender_v1_recommender_recommendations_list]
