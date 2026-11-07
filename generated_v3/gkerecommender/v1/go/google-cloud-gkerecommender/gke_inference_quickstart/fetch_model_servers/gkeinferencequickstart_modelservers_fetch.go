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

// [START gkerecommender_v1_gkeinferencequickstart_fetch_model_servers]

import (
	"context"
	"fmt"
	"io"

	gkerecommender "cloud.google.com/go/gkerecommender/apiv1"
	gkerecommenderpb "cloud.google.com/go/gkerecommender/apiv1/gkerecommenderpb"
	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// fetchModelServers fetches supported model servers for the specified model.
func fetchModelServers(ctx context.Context, w io.Writer, model string) error {
	client, err := gkerecommender.NewGkeInferenceQuickstartClient(ctx)
	if err != nil {
		return fmt.Errorf("NewGkeInferenceQuickstartClient failed: %w", err)
	}
	defer client.Close()

	req := &gkerecommenderpb.FetchModelServersRequest{
		Model: model,
	}

	it := client.FetchModelServers(ctx, req)

	fmt.Fprintf(w, "Supported model servers for %s:\n", model)
	for {
		ms, err := it.Next()
		if err == iterator.Done {
			break
		}
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "No model servers found.\n")
			return nil
		}
		if err != nil {
			return fmt.Errorf("failed to iterate model servers: %w", err)
		}
		fmt.Fprintf(w, "- %v\n", ms)
	}

	return nil
}

// [END gkerecommender_v1_gkeinferencequickstart_fetch_model_servers]
