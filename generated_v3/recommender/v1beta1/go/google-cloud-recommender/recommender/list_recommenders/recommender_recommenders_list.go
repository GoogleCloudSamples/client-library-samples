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

// [START recommender_v1beta1_recommender_recommenders_list]

import (
	"context"
	"errors"
	"fmt"
	"io"
	"os"

	recommender "cloud.google.com/go/recommender/apiv1beta1"
	recommenderpb "cloud.google.com/go/recommender/apiv1beta1/recommenderpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listRecommenders lists available recommender types.
func listRecommenders(ctx context.Context, w io.Writer) error {
	var opts []option.ClientOption
	if projectID := os.Getenv("GOOGLE_CLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	} else if projectID := os.Getenv("GCLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := recommender.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &recommenderpb.ListRecommendersRequest{}
	it := client.ListRecommenders(ctx, req)
	for {
		recommenderType, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListRecommenders iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Recommender: %s\n", recommenderType.GetName())
	}

	return nil
}

// [END recommender_v1beta1_recommender_recommenders_list]
