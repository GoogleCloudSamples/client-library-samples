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

// [START networkconnectivity_v1_internalrangeservice_internalranges_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1"
	"cloud.google.com/go/networkconnectivity/apiv1/networkconnectivitypb"
	"google.golang.org/api/iterator"
)

// listInternalRanges retrieves and prints internal ranges in the specified location.
func listInternalRanges(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := networkconnectivity.NewInternalRangeClient(ctx)
	if err != nil {
		return fmt.Errorf("networkconnectivity.NewInternalRangeClient: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.ListInternalRangesRequest{
		Parent: parent,
	}

	it := client.ListInternalRanges(ctx, req)
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}

		fmt.Fprintf(w, "Internal range: %s\n", resp.GetName())
	}

	return nil
}

// [END networkconnectivity_v1_internalrangeservice_internalranges_list]
